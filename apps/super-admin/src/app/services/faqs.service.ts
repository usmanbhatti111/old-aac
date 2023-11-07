import { HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { FaqRepository } from '@shared';
import { MODEL, ResponseMessage, successResponse } from '@shared/constants';
import {
  CreateFaqDto,
  DeleteFaqsDto,
  GetFaqsDto,
  IdDto,
  UpdateFaqDto,
} from '@shared/dto';
import dayjs from 'dayjs';

@Injectable()
export class FaqsService {
  constructor(private faqRepository: FaqRepository) {}

  notDeletedFilter = {
    isDeleted: false,
  };

  async createFaq(payload: CreateFaqDto) {
    try {
      const res = await this.faqRepository.create(payload);

      return successResponse(HttpStatus.CREATED, ResponseMessage.CREATED, res);
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async getFaq(payload: IdDto) {
    try {
      const filter = { isDeleted: false, _id: payload?.id };

      const res = await this.faqRepository.findOne(filter);

      return successResponse(HttpStatus.OK, ResponseMessage.SUCCESS, res);
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async getFaqs(payload: GetFaqsDto) {
    try {
      const limit = payload?.limit || 10;
      const offset = payload?.page || 1;

      const filterQuery = { isDeleted: false };

      if (payload?.faqCategory) {
        filterQuery['faqCategory'] = payload.faqCategory;
      }

      if (payload?.createdBy) {
        filterQuery['createdBy'] = payload.createdBy;
      }

      if (payload?.dateStart && payload?.dateEnd) {
        const startDate = dayjs(payload.dateStart).startOf('day').toDate();
        const endDate = dayjs(payload.dateEnd).endOf('day').toDate();

        filterQuery['createdAt'] = {
          gte: startDate,
          lte: endDate,
        };
      }

      if (payload?.search) {
        const search = { $regex: payload.search, $options: 'i' };

        filterQuery['$or'] = [
          {
            faqQuestion: search,
          },
          {
            faqAnswer: search,
          },
          {
            faqCategory: search,
          },
        ];
      }

      const pipelines = [
        {
          $lookup: {
            from: MODEL.USER,
            localField: 'createdBy',
            foreignField: '_id',
            as: 'createdBy',
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
                },
              },
            ],
          },
        },
        {
          $unwind: {
            path: '$createdBy',
            preserveNullAndEmptyArrays: true,
          },
        },
      ];
      const res = await this.faqRepository.paginate({
        filterQuery,
        offset,
        limit,
        pipelines,
      });

      return successResponse(HttpStatus.OK, ResponseMessage.SUCCESS, res);
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async updateFaq(payload: UpdateFaqDto) {
    try {
      const filter = { _id: payload?.id, isDeleted: false };

      const res = await this.faqRepository.findOneAndUpdate(filter, payload);

      return successResponse(HttpStatus.OK, ResponseMessage.SUCCESS, res);
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async deleteFaq(payload: DeleteFaqsDto) {
    try {
      const ids = payload.ids.split(',');

      const filter = { _id: { $in: ids }, isDeleted: false };
      const data = { isDeleted: true, deletedBy: payload.deletedBy };

      const res = await this.faqRepository.updateMany(filter, data);

      let message: string;
      if (ids.length === res.modifiedCount) {
        message = `${ids.length > 1 ? 'Records' : 'Record'} has been Deleted`;
      } else {
        message = `${res.modifiedCount} ${
          res.modifiedCount > 1 ? 'Records' : 'Record'
        } has been deleted outoff ${ids.length}`;
      }

      return successResponse(HttpStatus.OK, message);
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
