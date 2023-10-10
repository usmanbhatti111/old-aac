import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RMQ_MESSAGES } from '@shared/constants';
import { TaskService } from '../services/tasks.service';
import { AddTaskDto } from '@shared/dto';
@Controller()
export class TaskController {
  constructor(private taskService: TaskService) {}

  @MessagePattern(RMQ_MESSAGES.AIR_SERVICES.TASK.ADD_TASK)
  public async createTask(@Payload() payload: AddTaskDto) {
    return this.taskService.addTask(payload);
  }

  @MessagePattern(RMQ_MESSAGES.AIR_SERVICES.TASK.GET_TASKS)
  getTasks(@Payload() payload: AddTaskDto) {
    return this.taskService.getTasks(payload);
  }

  @MessagePattern(RMQ_MESSAGES.AIR_SERVICES.TASK.UPDATE_TASK)
  async updateTask(@Payload() payload: AddTaskDto) {
    return this.taskService.updateTask(payload);
  }

  @MessagePattern(RMQ_MESSAGES.AIR_SERVICES.TASK.DELETE_TASK)
  deleteTask(@Payload() payload: { ids: string[] }) {
    return this.taskService.deleteTask(payload);
  }
}
