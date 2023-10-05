import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  ResponseMessage,
  errorResponse,
  successResponse,
} from '@shared/constants';
import { CreateJobDto, FilterJobsDto, IdDTO, UpdateJobDto } from '@shared/dto';
import { Job, JobDocument } from '@shared/schemas';
import dayjs from 'dayjs';
import { Model } from 'mongoose';

@Injectable()
export class JobsService {
  constructor(
    @InjectModel(Job.name) private readonly jobModel: Model<JobDocument>
  ) {}

  notDeletedFilter = {
    isDeleted: false,
  };

  async createJob(payload: CreateJobDto) {
    try {
      const res = await this.jobModel.create(payload);
      return successResponse(HttpStatus.CREATED, ResponseMessage.CREATED, res);
    } catch (error) {
      return errorResponse(
        HttpStatus.BAD_REQUEST,
        ResponseMessage.BAD_REQUEST,
        error
      );
    }
  }

  async getJob(payload: IdDTO) {
    try {
      const res = await this.jobModel.findById(payload.id);
      return successResponse(HttpStatus.OK, ResponseMessage.SUCCESS, res);
    } catch (error) {
      return errorResponse(
        HttpStatus.BAD_REQUEST,
        ResponseMessage.BAD_REQUEST,
        error
      );
    }
  }

  async getJobs(payload: FilterJobsDto) {
    try {
      const { page, limit, search } = payload;

      const skip = limit * (page - 1);
      delete payload.page;
      delete payload.limit;
      delete payload.search;
      const createdAtFilter = {};
      if (payload.createdAt) {
        const startDate = dayjs(payload.createdAt).startOf('day');
        const endDate = dayjs(payload.createdAt).endOf('day');

        createdAtFilter['created_at'] = {
          gte: startDate.toDate(),
          lte: endDate.toDate(),
        };
        delete payload.createdAt;
      }

      let searchFilter;
      if (search) {
        searchFilter = {
          $or: [
            {
              title: {
                $regex: search,
                $options: 'i', // Optional: Case-insensitive search
              },
            },
            {
              description: {
                $regex: search,
                $options: 'i', // Optional: Case-insensitive search
              },
            },
          ],
        };
      }
      const pipeline = [
        {
          $match: {
            ...createdAtFilter,
            ...payload,
            ...this.notDeletedFilter,
            ...searchFilter,
          },
        },

        {
          $skip: skip,
        },

        {
          $limit: limit,
        },

        { $group: { _id: null, data: { $push: '$$ROOT' } } },
      ];

      const countPipeline = [
        {
          $match: {
            ...createdAtFilter,
            ...payload,
            ...this.notDeletedFilter,
            ...searchFilter,
          },
        },
        {
          $count: 'count',
        },
      ];

      const [res, count]: any = await Promise.all([
        this.jobModel.aggregate(pipeline),

        this.jobModel.aggregate(countPipeline),
      ]);

      const pagination = {
        count: count[0]?.count || 0,
        page,
        limit,
      };

      return successResponse(
        HttpStatus.OK,
        ResponseMessage.SUCCESS,
        res[0]?.data || [],
        pagination
      );
    } catch (error) {
      return errorResponse(
        HttpStatus.BAD_REQUEST,
        ResponseMessage.BAD_REQUEST,
        error
      );
    }
  }

  async updateJob(payload: UpdateJobDto) {
    try {
      const { id } = payload;
      delete payload.id;
      const res = await this.jobModel.updateOne({
        where: { id, ...this.notDeletedFilter },
        data: payload,
      });
      return successResponse(HttpStatus.OK, ResponseMessage.SUCCESS, res);
    } catch (error) {
      return errorResponse(
        HttpStatus.BAD_REQUEST,
        ResponseMessage.BAD_REQUEST,
        error
      );
    }
  }

  async deleteJob(payload: IdDTO) {
    try {
      const { id } = payload;
      const res = await this.jobModel.updateOne({
        where: { id },
        data: {
          isDeleted: true,
        },
      });
      return successResponse(HttpStatus.OK, ResponseMessage.SUCCESS, res);
    } catch (error) {
      return errorResponse(
        HttpStatus.BAD_REQUEST,
        ResponseMessage.BAD_REQUEST,
        error
      );
    }
  }
}
