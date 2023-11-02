import { HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { JobRepository } from '@shared';
import { MODEL, ResponseMessage, successResponse } from '@shared/constants';
import {
  CreateJobDto,
  DeleteJobsDto,
  GetJobsDto,
  IdDto,
  UpdateJobDto,
} from '@shared/dto';
import dayjs from 'dayjs';

@Injectable()
export class JobsService {
  constructor(private jobRepository: JobRepository) {}

  notDeletedFilter = {
    isDeleted: false,
  };

  async createJob(payload: CreateJobDto) {
    try {
      if (payload?.deadline) {
        payload.deadline = dayjs(payload.deadline).endOf('day').toDate();
      }

      const res = await this.jobRepository.create(payload);

      return successResponse(HttpStatus.CREATED, ResponseMessage.CREATED, res);
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async getJob(payload: IdDto) {
    try {
      const filter = { isDeleted: false, _id: payload.id };

      const res = await this.jobRepository.findOne(filter);

      return successResponse(HttpStatus.OK, ResponseMessage.SUCCESS, res);
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async getJobs(payload: GetJobsDto) {
    try {
      const limit = payload?.limit || 10;
      const offset = payload?.page || 1;

      const filterQuery = { isDeleted: false };

      if (payload?.jobCategory) {
        filterQuery['jobCategory'] = payload.jobCategory;
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

      if (payload?.status) {
        filterQuery['status'] = payload.status;
      }

      if (payload?.search) {
        const search = { $regex: payload.search, $options: 'i' };

        filterQuery['$or'] = [
          {
            title: search,
          },
          {
            description: search,
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

      const response = await this.jobRepository.paginate({
        filterQuery,
        offset,
        limit,
        pipelines,
      });

      return successResponse(HttpStatus.OK, ResponseMessage.SUCCESS, response);
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async updateJob(payload: UpdateJobDto) {
    try {
      const { id } = payload;

      const filter = { _id: id, isDeleted: false };

      const res = await this.jobRepository.findOneAndUpdate(filter, payload);

      return successResponse(HttpStatus.OK, ResponseMessage.SUCCESS, res);
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async deleteJob(payload: DeleteJobsDto) {
    try {
      const ids = payload.ids.split(',');

      const filter = { _id: { $in: ids }, isDeleted: false };
      const data = { isDeleted: true, deletedBy: payload.deletedBy };

      const res = await this.jobRepository.updateMany(filter, data);

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
