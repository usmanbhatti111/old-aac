import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { DealsRepository, LifecycleStagesRepository } from '@shared';
import {
  EDealProbabilityStage,
  EIsDeletedStatus,
  MODEL,
  ResponseMessage,
  successResponse,
} from '@shared/constants';
import {
  CreateDealDto,
  DeleteDealsDto,
  GetDealsListViewDto,
  GetSoftDeletedDealsDto,
  RestoreDealActionDto,
  UpdateDealDto,
} from '@shared/dto';

import dayjs from 'dayjs';

@Injectable()
export class DealsService {
  constructor(
    private dealsRepository: DealsRepository,
    private readonly lifecycleStagesRepository: LifecycleStagesRepository
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
}
