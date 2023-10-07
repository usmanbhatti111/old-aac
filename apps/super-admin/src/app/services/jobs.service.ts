import { HttpStatus, Injectable } from '@nestjs/common';
import { JobRepository } from '@shared';
import {
  ResponseMessage,
  errorResponse,
  successResponse,
} from '@shared/constants';
import { CreateJobDto, FilterJobsDto, IdDTO, UpdateJobDto } from '@shared/dto';
import dayjs from 'dayjs';

@Injectable()
export class JobsService {
  constructor(private jobRepository: JobRepository) {}

  notDeletedFilter = {
    isDeleted: false,
  };

  async createJob(payload: CreateJobDto) {
    try {
      const res = await this.jobRepository.create(payload);
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
      const res = await this.jobRepository.findOne({
        _id: payload.id,
        ...this.notDeletedFilter,
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

  async getJobs(payload: FilterJobsDto) {
    try {
      const { page, limit, search } = payload;

      const offset = limit * (page - 1);
      delete payload.page;
      delete payload.limit;
      delete payload.search;
      const createdAtFilter = {};
      if (payload.createdAt) {
        const startDate = dayjs(payload.createdAt).startOf('day');
        const endDate = dayjs(payload.createdAt).endOf('day');

        createdAtFilter['createdAt'] = {
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

      const filterQuery = {
        ...createdAtFilter,
        ...payload,
        ...this.notDeletedFilter,
        ...searchFilter,
      };

      const paginateRes = await this.jobRepository.paginate({
        filterQuery,
        offset,
        limit,
      });

      return successResponse(
        HttpStatus.OK,
        ResponseMessage.SUCCESS,
        paginateRes
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
      const res = await this.jobRepository.findOneAndUpdate(
        { _id: id, ...this.notDeletedFilter },
        payload
      );
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
      const res = await this.jobRepository.updateMany(
        { _id: { $in: id } },
        {
          isDeleted: true,
        }
      );
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
