import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RMQ_MESSAGES } from '@shared/constants';
import { TaskManagementService } from '../services/task-management.service';
import {
  AddTaskManagementDto,
  EditTaskManagementDto,
  GetTaskManagementDto,
} from '@shared/dto';

@Controller()
export class TaskManagementController {
  constructor(private taskManagementService: TaskManagementService) {}

  @MessagePattern(RMQ_MESSAGES.AIR_SERVICES.TASK_MANAGEMENT.CREATE_TASK)
  createTask(@Payload() payload: AddTaskManagementDto) {
    return this.taskManagementService.addTask(payload);
  }

  @MessagePattern(RMQ_MESSAGES.AIR_SERVICES.TASK_MANAGEMENT.TASK_LIST)
  getTasks(@Payload() payload: GetTaskManagementDto) {
    return this.taskManagementService.getTasks(payload);
  }

  @MessagePattern(RMQ_MESSAGES.AIR_SERVICES.TASK_MANAGEMENT.TASK_DETAIL)
  taskDetail(@Payload() payload: string) {
    return this.taskManagementService.findOne(payload);
  }

  @MessagePattern(RMQ_MESSAGES.AIR_SERVICES.TASK_MANAGEMENT.EDIT_TASK)
  updateTask(@Payload() payload: EditTaskManagementDto) {
    return this.taskManagementService.updateTask(payload);
  }

  @MessagePattern(RMQ_MESSAGES.AIR_SERVICES.TASK_MANAGEMENT.DELETE_TASK)
  deleteTask(@Payload() payload: { ids: string[]; deletedById: string }) {
    return this.taskManagementService.deleteTask(payload);
  }

  @MessagePattern(RMQ_MESSAGES.AIR_SERVICES.TASK_MANAGEMENT.TASK_ACTIVITY_LIST)
  getTasksActivities({ query }) {
    return this.taskManagementService.getTasksActivities(query);
  }
}
