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
}