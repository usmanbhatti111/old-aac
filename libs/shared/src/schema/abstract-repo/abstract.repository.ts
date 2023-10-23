import {
  BadRequestException,
  ConflictException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import {
  FilterQuery,
  Model,
  Types,
  UpdateQuery,
  SaveOptions,
  Connection,
  InsertManyOptions,
  ProjectionType,
  PipelineStage,
  Callback,
  AggregateOptions,
  Expression,
  QueryOptions,
  UpdateWithAggregationPipeline,
} from 'mongoose';
import { AbstractSchema } from './abstract.schema';

export abstract class AbstractRepository<TDocument extends AbstractSchema> {
  protected abstract readonly logger: Logger;
  private friendlyName: string;
  private singleName: string;

  constructor(
    protected readonly model: Model<TDocument>,
    private readonly connection: Connection
  ) {
    this.friendlyName = this.model.collection.name.replace(
      /[^a-zA-Z0-9]+(.)/g,
      (_, chr) => chr.toUpperCase()
    );
    let end: number;
    this.singleName = this.friendlyName.charAt(0).toUpperCase();
    if (this.friendlyName.slice(1).endsWith('ies')) {
      end = -3;
    } else if (this.friendlyName.slice(1).endsWith('es')) {
      end = -2;
    } else if (this.friendlyName.slice(1).endsWith('s')) {
      end = -1;
    }
    this.singleName += `${this.friendlyName
      .slice(1, end)
      .replace(/([A-Z]+)*([A-Z][a-z])/g, '$1 $2')}${
      end == -3 ? 'y' : ''
    }`.toLowerCase();
  }

  async create(document: TDocument, options?: SaveOptions): Promise<TDocument> {
    try {
      const createdDocument = new this.model({
        ...(!document._id && { _id: new Types.ObjectId() }),
        ...document,
      });
      return (
        await createdDocument.save(options)
      ).toJSON() as unknown as TDocument;
    } catch (err) {
      if (err.message.includes('duplicate')) {
        throw new ConflictException(`${this.friendlyName} already exists.`);
      }
      throw new BadRequestException(
        `Invalid ${this.singleName.toLowerCase()} data entered.`
      );
    }
  }

  async createMany(
    documents: Omit<TDocument, '_id'>[],
    options?: InsertManyOptions
  ): Promise<TDocument[]> {
    try {
      const insertedDocuments = await this.model.insertMany(documents, options);
      return insertedDocuments as unknown as TDocument[];
    } catch (err) {
      throw new BadRequestException(
        `Invalid ${this.singleName.toLowerCase()} data entered.`
      );
    }
  }
  async updateMany(
    filterQuery: FilterQuery<TDocument>,
    updates?: UpdateQuery<TDocument> | UpdateWithAggregationPipeline,
    options?: {}
  ): Promise<any> {
    return await Promise.resolve(
      this.model.updateMany(filterQuery, updates || {}, options || {})
    );
  }

  async delete(filterQuery?: FilterQuery<TDocument>): Promise<TDocument[]> {
    try {
      const deletedDocument = await this.model.deleteOne(filterQuery || {});
      if (deletedDocument.deletedCount === 0) {
        throw new NotFoundException(`${this.singleName} not found.`);
      }
      return deletedDocument as any;
    } catch (err) {
      if (err instanceof NotFoundException) {
        throw err;
      }
      throw new BadRequestException(
        `Invalid ${this.singleName.toLowerCase()} data entered.`
      );
    }
  }
  async deleteByQuery(filterQuery?: FilterQuery<TDocument>): Promise<any> {
    try {
      const deletedDocument = await this.model.findByIdAndDelete(
        filterQuery || {}
      );
      return deletedDocument;
    } catch (err) {
      if (err instanceof NotFoundException) {
        throw err;
      }
      throw new BadRequestException(
        `Invalid ${this.singleName.toLowerCase()} data entered.`
      );
    }
  }
  async deleteMany(
    filterQuery: FilterQuery<TDocument>,
    ids: Array<string>,
    column: string = '_id'
  ): Promise<any> {
    try {
      filterQuery = filterQuery || {};
      const query = { ...filterQuery, [column]: { $in: ids } };
      const deletedDocument = await this.model.deleteMany(query);
      if (deletedDocument.deletedCount === 0) {
        this.logger.warn(
          `${this.singleName} not found with filterQuery`,
          filterQuery
        );
        throw new NotFoundException(`${this.singleName} not found.`);
      }
      return deletedDocument as any;
    } catch (err) {
      if (err instanceof NotFoundException) {
        throw err;
      }
      throw new BadRequestException(
        `Error ${this.friendlyName.toLowerCase()}, ${err.message}.`
      );
    }
  }

  async findOneAndDelete(
    filterQuery: FilterQuery<TDocument>
  ): Promise<TDocument> {
    const document = await this.model.findOneAndDelete(filterQuery, {});
    if (!document) {
      this.logger.warn(
        `${this.singleName} not found with filterQuery`,
        filterQuery
      );
      throw new NotFoundException(`${this.singleName} not found.`);
    }
    return document;
  }

  async findOne(
    filterQuery: FilterQuery<TDocument>,
    projection?: ProjectionType<TDocument>,
    options?: {}
  ): Promise<TDocument> {
    const document = await this.model.findOne(
      filterQuery,
      projection || {},
      options || { lean: true }
    );

    if (!document) {
      this.logger.warn(
        `${this.singleName} not found with filterQuery`,
        filterQuery
      );
      throw new NotFoundException(`${this.singleName} not found.`);
    }

    return document;
  }

  async findOneAndUpdate(
    filterQuery: FilterQuery<TDocument>,
    update: UpdateQuery<TDocument>
  ) {
    const document = await this.model.findOneAndUpdate(filterQuery, update, {
      lean: true,
      new: true,
    });

    if (!document) {
      this.logger.warn(
        `${this.singleName} not found with filterQuery:`,
        filterQuery
      );
      throw new NotFoundException(`${this.singleName} not found.`);
    }

    return document;
  }

  async findByIdAndUpdate(
    filterQuery: FilterQuery<TDocument>,
    update: UpdateQuery<TDocument>
  ) {
    const document = await this.model.findByIdAndUpdate(filterQuery, update, {
      lean: true,
      new: true,
    });

    if (!document) {
      this.logger.warn(`Document not found with filterQuery:`, filterQuery);
      throw new NotFoundException('Document not found.');
    }

    return document;
  }

  async upsert(
    filterQuery: FilterQuery<TDocument>,
    document: Partial<TDocument>
  ) {
    return this.model.findOneAndUpdate(filterQuery, document, {
      lean: true,
      upsert: true,
      new: true,
    });
  }

  async find(
    filterQuery?: FilterQuery<TDocument>,
    projection?: ProjectionType<TDocument>,
    options?: QueryOptions<TDocument>
  ) {
    return this.model.find(
      filterQuery || {},
      projection || {},
      options || { lean: true }
    );
  }

  async startTransaction() {
    const session = await this.connection.startSession();
    session.startTransaction();
    return session;
  }

  async aggregate(pipeline?: PipelineStage[], options?: AggregateOptions) {
    return await this.model.aggregate(pipeline, options);
  }

  async count(filterQuery?: FilterQuery<TDocument>) {
    return await this.model.count(filterQuery);
  }

  async getDetails() {
    return await this.model.db.asPromise();
  }

  async paginate({
    filterQuery,
    offset = 1,
    limit = 10,
    returnKey,
    sort,
    pipelines = [],
  }: {
    filterQuery?: FilterQuery<TDocument>;
    offset: number;
    limit: number;
    returnKey?: string;
    sort?: Record<string, 1 | Expression.Meta | -1>;
    pipelines?: Array<any>;
  }) {
    if (typeof offset !== 'number') {
      offset = Number(offset);
    }
    if (typeof limit !== 'number') {
      limit = Number(limit);
    }
    const query = [
      {
        $match: {
          ...filterQuery,
        },
      },
      ...pipelines,
      {
        $sort: {
          ...sort,
          createdAt: -1,
        },
      },
      {
        $facet: {
          total: [
            {
              $sortByCount: '$tag',
            },
          ],
          data: [
            {
              $addFields: {
                _id: '$_id',
              },
            },
          ],
        },
      },
      {
        $unwind: '$total',
      },
      {
        $project: {
          collections: {
            $slice: [
              '$data',
              offset,
              {
                $ifNull: [limit, '$total.count'],
              },
            ],
          },
          total: '$total.count',
          page: {
            $ceil: { $literal: offset / limit + 1 },
          },
          pages: {
            $ceil: {
              $divide: ['$total.count', limit],
            },
          },
        },
      },
    ];
    const [data] = await this.model.aggregate<any>([
      {
        $match: {
          ...filterQuery,
        },
      },
      ...pipelines,
      {
        $sort: {
          ...sort,
          createdAt: -1,
        },
      },
      {
        $facet: {
          total: [
            {
              $sortByCount: '$tag',
            },
          ],
          data: [
            {
              $addFields: {
                _id: '$_id',
              },
            },
          ],
        },
      },
      {
        $unwind: '$total',
      },
      {
        $project: {
          collections: {
            $slice: [
              '$data',
              (offset - 1) * limit,
              {
                $ifNull: [limit, '$total.count'],
              },
            ],
          },
          total: '$total.count',
          page: {
            $ceil: { $literal: offset - 1 / limit },
          },
          pages: {
            $ceil: {
              $divide: ['$total.count', limit],
            },
          },
        },
      },
    ]);
    return {
      [!returnKey
        ? `${this.friendlyName[0].toLowerCase() + this.friendlyName.slice(1)}`
        : returnKey]: (<any>data)?.collections || [],
      meta: {
        page: (<any>data)?.page || 0,
        pages: (<any>data)?.pages || 0,
        limit,
        total: (<any>data)?.total || 0,
      },
    };
  }

  async newPaginate(
    query: any,
    pipeline: any[],
    options: { page?: number; limit?: number }
  ): Promise<{ result: any[]; meta: any }> {
    const page = options.page || 1;
    const limit = options.limit || 10;
    const skip = (page - 1) * limit;

    const results = await this.aggregate([
      { $match: query },
      ...pipeline,
      {
        $facet: {
          result: [{ $skip: skip }, { $limit: limit }],
          metadata: [
            { $count: 'total' },
            {
              $addFields: {
                page,
                limit,
                totalPages: {
                  $ceil: { $divide: ['$total', limit] },
                },
              },
            },
          ],
        },
      },
      { $unwind: '$metadata' },
    ]);

    return (
      results[0] ?? {
        results: [],
        metaData: {
          total: 0,
          page,
          limit,
          totalPages: 1,
        },
      }
    );
  }
}
