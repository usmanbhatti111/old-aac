import { HttpStatus, Injectable } from '@nestjs/common';
import { ResponseMessage, successResponse } from '@shared/constants';
import { TaskActivityRepository, TaskManagementRepository } from '@shared';
import { RpcException } from '@nestjs/microservices';
import {
  AddTaskManagementDto,
  GetTaskActivitytDto,
  GetTaskManagementDto,
} from '@shared/dto';
import { Types } from 'mongoose';

@Injectable()
export class TaskManagementService {
  constructor(
    private readonly taskManagementRepository: TaskManagementRepository,
    private readonly taskActivityRepository: TaskActivityRepository
  ) {}

  async addTask(payload: AddTaskManagementDto) {
    try {
      const res = await this.taskManagementRepository.create(payload);
      return successResponse(HttpStatus.CREATED, ResponseMessage.SUCCESS, res);
    } catch (error) {
      return new RpcException(error);
    }
  }

  async getTasks(payload: GetTaskManagementDto) {
    try {
      const { search, page = 1, limit = 10 } = payload;
      delete payload.search;
      delete payload.page;
      delete payload.limit;

      const offset = limit * (page - 1);
      const pipelines = [];

      if (search) {
        pipelines.push({
          $match: {
            name: { $regex: search, $options: 'i' },
          },
        });
      }

      pipelines.push({
        $lookup: {
          from: 'deals',
          localField: 'dealId',
          foreignField: '_id',
          as: 'dealId',
        },
      });

      pipelines.push({
        $unwind: {
          path: '$dealId',
          preserveNullAndEmptyArrays: true,
        },
      });

      pipelines.push({
        $lookup: {
          from: 'users',
          localField: 'assignTo',
          foreignField: '_id',
          as: 'assignTo',
        },
      });

      pipelines.push({
        $unwind: {
          path: '$assignTo',
          preserveNullAndEmptyArrays: true,
        },
      });

      const filterQuery = {
        ...payload,
        isDeleted: false,
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

  async findOne(id: string) {
    try {
      const task = await this.taskManagementRepository.findOne({
        _id: id,
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

      const data: any = {
        action: res.status,
        taskManagementId: res._id,
      };

      await this.taskActivityRepository.create(data);
      return successResponse(HttpStatus.OK, ResponseMessage.SUCCESS, res);
    } catch (error) {
      return new RpcException(error);
    }
  }

  async deleteTask(payload: { ids: string[]; deletedById: string }) {
    try {
      const res = await this.taskManagementRepository.updateMany(
        {
          _id: payload.ids,
        },
        { deletedById: payload.deletedById, isDeleted: true }
      );

      return successResponse(HttpStatus.OK, ResponseMessage.SUCCESS, res);
    } catch (error) {
      return new RpcException(error);
    }
  }

  async getTasksActivities(query: GetTaskActivitytDto) {
    try {
      const { taskId, search } = query;
      const pipelines = [];

      pipelines.push({
        $lookup: {
          from: 'taskmanagements',
          localField: 'taskManagementId',
          foreignField: '_id',
          as: 'taskManagementDetails',
        },
      });

      pipelines.push({
        $unwind: {
          path: '$taskManagementDetails',
          preserveNullAndEmptyArrays: true,
        },
      });

      pipelines.push({
        $lookup: {
          from: 'users',
          localField: 'taskManagementDetails.assignTo',
          foreignField: '_id',
          as: 'assignToDetails',
        },
      });

      pipelines.push({
        $unwind: '$assignToDetails',
      });

      pipelines.push({
        $project: {
          taskManagementDetails: {
            $mergeObjects: [
              '$taskManagementDetails',
              { assignToDetails: '$assignToDetails' },
            ],
          },
        },
      });

      if (search) {
        pipelines.push({
          $match: {
            'taskManagementDetails.assignToDetails.firstName': {
              $regex: search,
              $options: 'i',
            },
          },
        });
      }

      if (taskId) {
        pipelines.push({
          $match: {
            taskManagementId: new Types.ObjectId(taskId),
          },
        });
      }

      const res = await this.taskActivityRepository.aggregate(pipelines);

      return successResponse(HttpStatus.OK, ResponseMessage.SUCCESS, res);
    } catch (error) {
      return new RpcException(error);
    }
  }
}
