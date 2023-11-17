import { HttpStatus, Injectable } from '@nestjs/common';
import { errorResponse, successResponse } from '@shared/constants';
import { TaskRepository } from '@shared';
import mongoose from 'mongoose';

@Injectable()
export class TaskService {
  constructor(private readonly taskRepository: TaskRepository) {}

  async addTask(payload) {
    try {
      const res = await this.taskRepository.create({ ...payload });
      return successResponse(HttpStatus.CREATED, 'Success', res);
    } catch (error) {
      return errorResponse(HttpStatus.BAD_REQUEST, 'Bad Request', error?.name);
    }
  }

  async getTasks(payload) {
    try {
      const { ticketId, page, limit } = payload;
      const filterQuery = {};
      const offset = limit * (page - 1);
      if (ticketId) {
        filterQuery['ticketId'] = new mongoose.Types.ObjectId(ticketId);
      }
      const res = await this.taskRepository.paginate({
        filterQuery,
        offset,
        limit,
      });

      return successResponse(HttpStatus.CREATED, 'Success', res);
    } catch (error) {
      return errorResponse(HttpStatus.BAD_REQUEST, 'Bad Request', error?.name);
    }
  }

  async updateTask(payload) {
    try {
      const { id, updateTaskDto } = payload;
      const updateFields = {};

      if (updateTaskDto.title !== undefined) {
        updateFields['title'] = updateTaskDto.title;
      }
      if (updateTaskDto.departmentId !== undefined) {
        updateFields['departmentId'] = updateTaskDto.departmentId;
      }
      if (updateTaskDto.description !== undefined) {
        updateFields['description'] = updateTaskDto.description;
      }
      if (updateTaskDto.createdBy !== undefined) {
        updateFields['createdBy'] = updateTaskDto.createdBy;
      }
      if (updateTaskDto.assignTo !== undefined) {
        updateFields['assignTo'] = updateTaskDto.assignTo;
      }
      if (updateTaskDto.status !== undefined) {
        updateFields['status'] = updateTaskDto.status;
      }
      if (updateTaskDto.notifyBefore !== undefined) {
        updateFields['notifyBefore'] = updateTaskDto.notifyBefore;
      }
      if (updateTaskDto.startDate !== undefined) {
        updateFields['startDate'] = updateTaskDto.startDate;
      }
      if (updateTaskDto.startDateTime !== undefined) {
        updateFields['startDateTime'] = updateTaskDto.startDateTime;
      }
      if (updateTaskDto.endDate !== undefined) {
        updateFields['endDate'] = updateTaskDto.endDate;
      }
      if (updateTaskDto.endDateTime !== undefined) {
        updateFields['endDateTime'] = updateTaskDto.endDateTime;
      }
      if (updateTaskDto.plannedEffort !== undefined) {
        updateFields['plannedEffort'] = updateTaskDto.plannedEffort;
      }
      if (updateTaskDto.comments !== undefined) {
        updateFields['comments'] = updateTaskDto.comments;
      }

      const res = await this.taskRepository.findOneAndUpdate(
        { _id: id },
        { $set: updateFields }
      );
      return successResponse(HttpStatus.OK, 'Success', res);
    } catch (error) {
      return errorResponse(HttpStatus.BAD_REQUEST, 'Bad Request', error?.name);
    }
  }

  async deleteTaskData(payload: { ids: string[] }) {
    try {
      const res = await this.taskRepository.deleteMany({}, payload.ids);
      return successResponse(HttpStatus.OK, 'Success', res);
    } catch (error) {
      return errorResponse(HttpStatus.BAD_REQUEST, 'Bad Request', error?.name);
    }
  }
}
