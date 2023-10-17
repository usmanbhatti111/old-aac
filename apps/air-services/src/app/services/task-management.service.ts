import { HttpStatus, Injectable } from '@nestjs/common';
import { ResponseMessage, successResponse } from '@shared/constants';
import { TaskManagementRepository } from '@shared';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class TaskManagementService {
  constructor(
    private readonly taskManagementRepository: TaskManagementRepository
  ) {}

  async addTask(payload) {
    try {
      const res = await this.taskManagementRepository.create(payload);
      return successResponse(HttpStatus.CREATED, ResponseMessage.SUCCESS, res);
    } catch (error) {
      return new RpcException(error);
    }
  }

  async getTasks(payload) {
    try {
      const { search, page, limit } = payload.query;
      delete payload.query.search;
      delete payload.query.page;
      delete payload.query.limit;

      const offset = limit * (page - 1);
      const pipelines = [];

      if (search) {
        pipelines.push({
          $match: {
            name: { $regex: search, $options: 'i' },
          },
        });
      }

      const filterQuery = {
        ...payload.query,
      };

      const res = await this.taskManagementRepository.paginate({
        filterQuery,
        offset,
        limit,
        pipelines,
      });
      return successResponse(HttpStatus.OK, ResponseMessage.SUCCESS, res);
    } catch (error) {
      return new RpcException(error);
    }
  }

  async findOne(taskId) {
    try {
      const task = await this.taskManagementRepository.findOne({
        _id: taskId?.id,
      });

      return successResponse(HttpStatus.OK, ResponseMessage.SUCCESS, task);
    } catch (error) {
      return new RpcException(error);
    }
  }

  async updateTask(payload) {
    try {
      const { id, updateTaskDto } = payload;
      const res = await this.taskManagementRepository.findOneAndUpdate(
        { _id: id },
        updateTaskDto
      );
      return successResponse(HttpStatus.OK, ResponseMessage.SUCCESS, res);
    } catch (error) {
      return new RpcException(error);
    }
  }

  async deleteTask(payload: { ids: string[] }) {
    try {
      const res = await this.taskManagementRepository.deleteMany(
        {},
        payload.ids
      );
      return successResponse(HttpStatus.OK, ResponseMessage.SUCCESS, res);
    } catch (error) {
      return new RpcException(error);
    }
  }
}
