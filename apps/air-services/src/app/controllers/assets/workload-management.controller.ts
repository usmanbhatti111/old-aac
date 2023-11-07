import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RMQ_MESSAGES } from '@shared/constants';

import { WorkloadManagementService } from '../../services/assets/workload-management.service';
import { UserTasksDto } from '@shared/dto';

@Controller()
export class WorkloadManagementController {
  constructor(private taskManagementService: WorkloadManagementService) {}

  @MessagePattern(RMQ_MESSAGES.AIR_SERVICES.WORK_LOAD_MANAGEMENT.WORK_LOAD_LIST)
  getWorkload({ query }) {
    return this.taskManagementService.getWorkload(query);
  }

  @MessagePattern(RMQ_MESSAGES.AIR_SERVICES.WORK_LOAD_MANAGEMENT.GET_USER_TASKS)
  getUsersTasks(@Payload() userIds: UserTasksDto) {
    return this.taskManagementService.getUsersTasks(userIds);
  }
}
