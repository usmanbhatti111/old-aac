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
}
