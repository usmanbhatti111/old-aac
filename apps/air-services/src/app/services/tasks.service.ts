import { HttpStatus, Injectable } from '@nestjs/common';
import { errorResponse, successResponse } from '@shared/constants';
import { TaskRepository } from '@shared';

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

  async getTasks(ticketId) {
    try {
      const res = await this.taskRepository.find({ ticketId });
      return successResponse(HttpStatus.CREATED, 'Success', res);
    } catch (error) {
      return errorResponse(HttpStatus.BAD_REQUEST, 'Bad Request', error?.name);
    }
  }

  async updateTask(payload) {
    try {
      const { id, updateTaskDto } = payload;
      const res = await this.taskRepository.findOneAndUpdate(
        { _id: id },
        updateTaskDto
      );
      return successResponse(HttpStatus.OK, 'Success', res);
    } catch (error) {
      return errorResponse(HttpStatus.BAD_REQUEST, 'Bad Request', error?.name);
    }
  }

  async deleteTask(payload: { ids: string[] }) {
    try {
      const res = await this.taskRepository.deleteMany({}, payload.ids);
      return successResponse(HttpStatus.OK, 'Success', res);
    } catch (error) {
      return errorResponse(HttpStatus.BAD_REQUEST, 'Bad Request', error?.name);
    }
  }
}
