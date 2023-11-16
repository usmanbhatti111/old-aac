import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import {
  AttachmentRepository,
  ContactRepository,
  DealsRepository,
  LifecycleStagesRepository,
  NoteRepository,
  OrganizationRepository,
  SalesProductRepository,
  TaskRepository,
  TicketRepository,
} from '@shared';
import {
  EDealProbabilityStage,
  EExportFile,
  EIsDeletedStatus,
  MODEL,
  ResponseMessage,
  successResponse,
} from '@shared/constants';
import {
  CreateDealDto,
  DealTaskDto,
  DeleteDealsDto,
  GetDealsGridtViewDto,
  GetDealsListViewDto,
  GetSoftDeletedDealsDto,
  RestoreDealActionDto,
  UpdateDealDto,
} from '@shared/dto';

import { DealAssociationDto, IdDto } from '@shared/dto';
import { DownloadService } from '@shared/services';
import dayjs from 'dayjs';

@Injectable()
export class DealsService {
  constructor(
    private dealsRepository: DealsRepository,
    private readonly salesProductRepository: SalesProductRepository,
    private readonly lifecycleStagesRepository: LifecycleStagesRepository,
    private readonly contactRepository: ContactRepository,
    private readonly attachmentRepository: AttachmentRepository,
    private readonly ticketRepository: TicketRepository,
    private readonly organizationRepository: OrganizationRepository,
    private readonly noteRepository: NoteRepository,
    private readonly taskRepository: TaskRepository,
    private readonly downloadService: DownloadService
  ) {}

  async createDeal(payload: CreateDealDto) {
    try {
      // get deal winning probabilty according to deal stage
      if (payload?.dealStageId) {
        const filter = { _id: payload.dealStageId };
        const lifecycleStage = await this.lifecycleStagesRepository.findOne(
          filter
        );

        const stage = lifecycleStage?.name?.toUpperCase();

        if (Object.keys(EDealProbabilityStage).includes(stage)) {
          payload.probability = EDealProbabilityStage[stage];
        }
      }

      const res = await this.dealsRepository.create(payload);

      const response = successResponse(
        HttpStatus.CREATED,
        ResponseMessage.SUCCESS,
        res
      );

      return response;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async updateDeal(payload: UpdateDealDto) {
    try {
      const { id, updatedBy } = payload;

      // get deal winning probabilty according to deal stage
      if (payload?.dealStageId) {
        const filter = { _id: payload.dealStageId };
        const lifecycleStage = await this.lifecycleStagesRepository.findOne(
          filter
        );

        const stage = lifecycleStage?.name?.toUpperCase();

        if (Object.keys(EDealProbabilityStage).includes(stage)) {
          payload.probability = EDealProbabilityStage[stage];
        }
      }

      const filter = {
        _id: id,
        isDeleted: EIsDeletedStatus.ACTIVE,
        createdBy: updatedBy,
      };

      const res = await this.dealsRepository.findOneAndUpdate(filter, payload);

      return successResponse(HttpStatus.OK, ResponseMessage.SUCCESS, res);
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async getDealsListVew(payload: GetDealsListViewDto) {
    try {
      const { userId } = payload;

      const filterQuery = {
        isDeleted: EIsDeletedStatus.ACTIVE,
        createdBy: userId,
      };

      if (payload?.dealPiplineId) {
        filterQuery['dealPiplineId'] = payload.dealPiplineId;
      }

      if (payload?.name) {
        filterQuery['name'] = { $regex: payload.name, $options: 'i' };
      }

      if (payload?.dealOwnerId) {
        filterQuery['dealOwnerId'] = payload.dealStageId;
      }

      if (payload?.dateStart && payload?.dateEnd) {
        const startOfDate = dayjs(payload.dateStart).startOf('day').toDate();
        const endOfDate = dayjs(payload.dateEnd).endOf('day').toDate();

        filterQuery['closeDate'] = { $gte: startOfDate, $lte: endOfDate };
      }

      if (payload?.dealStageId) {
        filterQuery['dealStageId'] = payload.dealStageId;
      }

      const limit = payload?.limit ? payload.limit : 10;
      const offset = payload?.page ? payload.page : 1;

      const dealPipeline = [
        {
          $lookup: {
            from: MODEL.DEAL_PIPELINE,
            localField: 'dealPiplineId',
            foreignField: '_id',
            as: 'dealPipeline',
          },
        },
        {
          $unwind: {
            path: '$dealPipeline',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $addFields: {
            dealPipeline: { $ifNull: ['$dealPipeline.name', ''] },
          },
        },
      ];

      const dealStage = [
        {
          $lookup: {
            from: MODEL.LIFECYCLE_STAGE,
            localField: 'dealStageId',
            foreignField: '_id',
            as: 'dealStage',
          },
        },
        {
          $unwind: {
            path: '$dealStage',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $addFields: {
            dealStage: { $ifNull: ['$dealStage.name', ''] },
          },
        },
      ];

      const dealOwner = [
        {
          $lookup: {
            from: MODEL.USER,
            localField: 'dealOwnerId',
            foreignField: '_id',
            as: 'dealOwner',
            pipeline: [
              {
                $project: {
                  _id: 1,
                  name: {
                    $concat: [
                      { $ifNull: ['$firstName', ''] },
                      ' ',
                      { $ifNull: ['$lastName', ''] },
                    ],
                  },
                  email: 1,
                  // add user profile image
                },
              },
            ],
          },
        },
        {
          $unwind: {
            path: '$dealOwner',
            preserveNullAndEmptyArrays: true,
          },
        },
      ];

      let searchPipeline = [];

      if (payload?.search) {
        const search = { $regex: payload.search, $options: 'i' };
        searchPipeline = [
          {
            $match: {
              $or: [
                { name: search },
                { dealStage: search },
                { dealPipeline: search },
                { 'dealOwner.name': search },
              ],
            },
          },
        ];
      }

      const pipelines = [
        ...dealPipeline,
        ...dealStage,
        ...dealOwner,
        ...searchPipeline,
      ];

      const res = await this.dealsRepository.paginate({
        filterQuery,
        offset,
        limit,
        pipelines,
      });

      if (payload?.downloadType) {
        if (!(payload?.downloadType in EExportFile))
          throw new BadRequestException('Invaid download format');

        const deals = res?.deals;
        const response = [];

        if (!deals?.length) {
          throw new BadRequestException('No Data Available');
        }

        for (let i = 0; i < deals.length; i++) {
          const data = deals[i];

          const deal = {};

          deal['S. No'] = i + 1;
          deal['Name'] = data?.name;
          deal['Owner Name'] = data?.dealOwner?.name;
          deal['Owner Email'] = data?.dealOwner?.email;
          deal['Close Date'] = dayjs(data?.closeDate).format('MMMM D, YYYY');
          deal['Amount'] = data?.amount;
          deal['Deal Pipeline'] = data?.dealPipeline;
          deal['Deal Stage'] = data?.dealStage;

          response.push(deal);
        }

        // excel response
        if (payload?.downloadType === EExportFile.XLS) {
          const xlsxBuffer = await this.downloadService.convertToXlsx(response);

          return successResponse(
            HttpStatus.OK,
            ResponseMessage.SUCCESS,
            xlsxBuffer
          );
        }

        // csv response
        if (payload?.downloadType === EExportFile.CSV) {
          const csvStream = this.downloadService.convertToCsv(response);

          return successResponse(
            HttpStatus.OK,
            ResponseMessage.SUCCESS,
            csvStream
          );
        }
      }

      const response = successResponse(
        HttpStatus.OK,
        ResponseMessage.SUCCESS,
        res
      );

      return response;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async getDealsGridView(payload: GetDealsGridtViewDto) {
    try {
      const { userId } = payload;

      const filterQuery = {
        isDeleted: EIsDeletedStatus.ACTIVE,
        createdBy: userId,
      };

      if (payload?.dealPiplineId) {
        filterQuery['dealPiplineId'] = payload.dealPiplineId;
      }

      if (payload?.name) {
        filterQuery['name'] = { $regex: payload.name, $options: 'i' };
      }

      if (payload?.dealOwnerId) {
        filterQuery['dealOwnerId'] = payload.dealStageId;
      }

      if (payload?.dateStart && payload?.dateEnd) {
        const startOfDate = dayjs(payload.dateStart).startOf('day').toDate();
        const endOfDate = dayjs(payload.dateEnd).endOf('day').toDate();

        filterQuery['closeDate'] = { $gte: startOfDate, $lte: endOfDate };
      }

      if (payload?.dealStageId) {
        filterQuery['dealStageId'] = payload.dealStageId;
      }

      const filterQueryPipline = [
        {
          $match: {
            ...filterQuery,
          },
        },
      ];

      const dealStagePipeline = [
        {
          $lookup: {
            from: MODEL.LIFECYCLE_STAGE,
            localField: 'dealStageId',
            foreignField: '_id',
            as: 'dealStage',
          },
        },
        {
          $unwind: {
            path: '$dealStage',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $addFields: {
            dealStage: { $ifNull: ['$dealStage.name', ''] },
          },
        },
      ];

      const dealOwnerPipline = [
        {
          $lookup: {
            from: MODEL.USER,
            localField: 'dealOwnerId',
            foreignField: '_id',
            as: 'dealOwner',
            pipeline: [
              {
                $project: {
                  _id: 1,
                  name: {
                    $concat: [
                      { $ifNull: ['$firstName', ''] },
                      ' ',
                      { $ifNull: ['$lastName', ''] },
                    ],
                  },
                  // add user profile image
                },
              },
            ],
          },
        },
        {
          $unwind: {
            path: '$dealOwner',
            preserveNullAndEmptyArrays: true,
          },
        },
      ];

      let searchPipeline = [];

      if (payload?.search) {
        const search = { $regex: payload.search, $options: 'i' };
        searchPipeline = [
          {
            $match: {
              $or: [
                { name: search },
                { dealStage: search },
                { 'dealOwner.name': search },
              ],
            },
          },
        ];
      }

      const groupByPipeline = [
        {
          $group: { _id: '$dealStageId', deals: { $push: '$$ROOT' } },
        },
        {
          $project: {
            _id: 0,
            deals: 1,
          },
        },
      ];

      const res = await this.dealsRepository.aggregate([
        ...filterQueryPipline,
        ...dealStagePipeline,
        ...dealOwnerPipline,
        ...searchPipeline,
        ...groupByPipeline,
      ]);

      // Initialize an empty object to store the transformed result
      const response = {};

      // Loop through the original result and organize it by deal stage name
      res.forEach((item) => {
        item.deals.forEach((deal) => {
          const dealStage = deal?.dealStage;

          if (!response[dealStage]) {
            response[dealStage] = [];
          }

          response[dealStage].push(deal);
        });
      });

      return successResponse(HttpStatus.OK, ResponseMessage.SUCCESS, response);
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async associateDeal(payload: DealAssociationDto) {
    try {
      const filter = { _id: payload?.dealId, isDeleted: false };

      const res = await this.dealsRepository.findOneAndUpdate(filter, {
        $push: {
          productsIds: payload?.productId,
          contactsIds: payload?.contactId,
          quotesIds: payload?.quoteId,
          companiesIds: payload?.companyId,
          ticketsIds: payload?.ticketId,
          attachmentsIds: payload?.attachmentId,
        },
      });

      return successResponse(HttpStatus.OK, ResponseMessage.SUCCESS, res);
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async disassociateDeal(payload: DealAssociationDto) {
    try {
      const filter = { _id: payload?.dealId, isDeleted: false };

      const res = await this.dealsRepository.findOneAndUpdate(filter, {
        $pull: {
          productsIds: payload?.productId,
          contactsIds: payload?.contactId,
          quotesIds: payload?.quoteId,
          companiesIds: payload?.companyId,
          ticketsIds: payload?.ticketId,
          attachmentsIds: payload?.attachmentId,
        },
      });

      return successResponse(HttpStatus.OK, ResponseMessage.SUCCESS, res);
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async addTask(payload: DealTaskDto) {
    try {
      const filter = { _id: payload?.dealId, isDeleted: false };

      const res = await this.dealsRepository.findOneAndUpdate(filter, {
        $push: {
          tasksIds: payload?.taskId,
        },
      });

      return successResponse(HttpStatus.OK, ResponseMessage.SUCCESS, res);
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async deleteTask(payload: DealTaskDto) {
    try {
      const filter = { _id: payload?.dealId, isDeleted: false };

      const res = await this.dealsRepository.findOneAndUpdate(filter, {
        $pull: {
          tasksIds: payload?.taskId,
        },
      });

      return successResponse(HttpStatus.OK, ResponseMessage.SUCCESS, res);
    } catch (error) {
      throw new RpcException(error);
    }
  }

  // async addNote(payload: DealNoteDto) {
  //   try {
  //     const filter = { _id: payload?.dealId, isDeleted: false };

  //     const res = await this.dealsRepository.findOneAndUpdate(filter, {
  //       $push: {
  //         notesIds: payload?.noteId,
  //       },
  //     });

  //     return successResponse(HttpStatus.OK, ResponseMessage.SUCCESS, res);
  //   } catch (error) {
  //     throw new RpcException(error);
  //   }
  // }

  // async deleteNote(payload: DealNoteDto) {
  //   try {
  //     const filter = { _id: payload?.dealId, isDeleted: false };

  //     const res = await this.dealsRepository.findOneAndUpdate(filter, {
  //       $pull: {
  //         notesIds: payload?.noteId,
  //       },
  //     });

  //     return successResponse(HttpStatus.OK, ResponseMessage.SUCCESS, res);
  //   } catch (error) {
  //     throw new RpcException(error);
  //   }
  // }

  async deleteDeals(payload: DeleteDealsDto) {
    try {
      const ids = payload?.ids?.split(',');

      const filterQuery = { _id: { $in: ids }, createdBy: payload.deletedBy };
      const updates = {
        isDeleted: EIsDeletedStatus.SOFT_DELETED,
        deletedBy: payload?.deletedBy,
        deletedAt: new Date(),
      };

      const res = await this.dealsRepository.updateMany(filterQuery, updates);

      let message: string;
      if (ids.length === res.modifiedCount) {
        message = `${ids.length > 1 ? 'Records' : 'Record'} has been Deleted`;
      } else {
        message = `${res.modifiedCount} ${
          res.modifiedCount > 1 ? 'Records' : 'Record'
        } has been deleted outoff ${ids.length}`;
      }

      const response = successResponse(HttpStatus.OK, message);

      return response;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async getSoftDeletedDeals(payload: GetSoftDeletedDealsDto) {
    try {
      const { deletedBy } = payload;

      const filterQuery = {
        isDeleted: EIsDeletedStatus.SOFT_DELETED,
        deletedBy: deletedBy,
      };

      if (payload?.dateStart && payload?.dateEnd) {
        const startOfDate = dayjs(payload.dateStart).startOf('day').toDate();
        const endOfDate = dayjs(payload.dateEnd).endOf('day').toDate();

        filterQuery['deletedAt'] = { $gte: startOfDate, $lte: endOfDate };
      }

      const limit = payload?.limit ? payload.limit : 10;
      const offset = payload?.page ? payload.page : 1;

      const dealsPipline = [
        {
          $project: {
            name: 1,
            deletedBy: 1,
            deletedAt: 1,
          },
        },
      ];

      const deletedByPipeline = [
        {
          $lookup: {
            from: MODEL.USER,
            localField: 'deletedBy',
            foreignField: '_id',
            as: 'deletedBy',
            pipeline: [
              {
                $project: {
                  _id: 1,
                  name: {
                    $concat: [
                      { $ifNull: ['$firstName', ''] },
                      ' ',
                      { $ifNull: ['$lastName', ''] },
                    ],
                  },
                  // add user profile image
                },
              },
            ],
          },
        },
        {
          $unwind: {
            path: '$deletedBy',
            preserveNullAndEmptyArrays: true,
          },
        },
      ];

      let searchPipeline = [];

      if (payload?.search) {
        const search = { $regex: payload.search, $options: 'i' };
        searchPipeline = [
          {
            $match: {
              $or: [{ name: search }, { 'deletedBy.name': search }],
            },
          },
        ];
      }

      const pipelines = [
        ...dealsPipline,
        ...deletedByPipeline,
        ...searchPipeline,
      ];

      const res = await this.dealsRepository.paginate({
        filterQuery,
        offset,
        limit,
        pipelines,
        sort: { deletedAt: -1 },
      });

      const response = successResponse(
        HttpStatus.OK,
        ResponseMessage.SUCCESS,
        res
      );

      return response;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async restoreDealAction(payload: RestoreDealActionDto) {
    try {
      const { id, deletedBy, action } = payload;

      const filterQuery = { _id: id, deletedBy };

      let data = {};
      if (action === EIsDeletedStatus.HARD_DELETED) {
        data = {
          isDeleted: EIsDeletedStatus.HARD_DELETED,
          deletedAt: new Date(),
          deletedBy,
        };
      } else if (action === EIsDeletedStatus.ACTIVE) {
        data = {
          isDeleted: EIsDeletedStatus.ACTIVE,
          deletedAt: null,
          deletedBy: null,
        };
      } else {
        throw new BadRequestException('Invalid action type');
      }

      await this.dealsRepository.findOneAndUpdate(filterQuery, data);

      return successResponse(HttpStatus.OK, ResponseMessage.SUCCESS, {});
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async populateAssociations(payload: IdDto) {
    try {
      const filter = { _id: payload.id, isDeleted: EIsDeletedStatus.ACTIVE };
      const deal = await this.dealsRepository.findOne(filter);
      const res = {};
      res['products'] = await this.salesProductRepository.find({
        _id: { $in: deal.productsIds },
      });
      res['contacts'] = await this.contactRepository.find({
        _id: { $in: deal.contactsIds },
      });
      // deal['quotes'] = await this..find({
      // _id: { $in: deal.quotesIds },
      // });
      res['attachments'] = await this.attachmentRepository.find({
        _id: { $in: deal.attachmentsIds },
      });
      res['companies'] = await this.organizationRepository.find({
        _id: { $in: deal.companiesIds },
      });
      res['tickets'] = await this.ticketRepository.find({
        _id: { $in: deal.ticketsIds },
      });
      return successResponse(HttpStatus.OK, ResponseMessage.SUCCESS, res);
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async dealPreview(payload: IdDto) {
    try {
      const { id } = payload;

      const filter = { _id: id, isDeleted: EIsDeletedStatus.ACTIVE };

      const res = await this.dealsRepository.findOne(filter);

      res['contacts'] = await this.contactRepository.find({
        _id: { $in: res.contactsIds },
      });

      res['companies'] = await this.organizationRepository.find({
        _id: { $in: res.companiesIds },
      });

      res['tickets'] = await this.ticketRepository.find({
        _id: { $in: res.ticketsIds },
      });

      res['products'] = await this.salesProductRepository.find({
        _id: { $in: res.productsIds },
      });

      // res['quotes'] = await this..find({
      // _id: { $in: res.quotesIds },
      // });

      res['attachments'] = await this.attachmentRepository.find({
        _id: { $in: res.attachmentsIds },
      });

      const response = successResponse(
        HttpStatus.OK,
        ResponseMessage.SUCCESS,
        res
      );

      return response;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  // async getNotes(payload: IdDto) {
  //   try {
  //     const pipeline = [
  //       {
  //         $match: {
  //           _id: payload?.id,
  //           isDeleted: false,
  //         },
  //       },
  //       {
  //         $lookup: {
  //           from: 'notes',
  //           localField: 'notesIds',
  //           foreignField: '_id',
  //           as: 'notes',
  //         },
  //       },
  //     ];

  //     const deal = await this.dealsRepository.aggregate(pipeline);
  //     return successResponse(HttpStatus.OK, ResponseMessage.SUCCESS, deal);
  //   } catch (error) {
  //     throw new RpcException(error);
  //   }
  // }

  async getTasks(payload: IdDto) {
    try {
      const pipeline = [
        {
          $match: {
            _id: payload?.id,
            isDeleted: false,
          },
        },
        {
          $lookup: {
            from: 'tasks',
            localField: 'tasksIds',
            foreignField: '_id',
            as: 'tasks',
          },
        },
      ];

      const deal = await this.dealsRepository.aggregate(pipeline);

      return successResponse(HttpStatus.OK, ResponseMessage.SUCCESS, deal);
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
