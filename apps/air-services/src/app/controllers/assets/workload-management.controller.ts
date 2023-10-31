import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { RMQ_MESSAGES } from '@shared/constants';

import { WorkloadManagementService } from '../../services/assets/workload-management.service';

@Controller()
export class WorkloadManagementController {
  constructor(private taskManagementService: WorkloadManagementService) {}

  @MessagePattern(RMQ_MESSAGES.AIR_SERVICES.WORK_LOAD_MANAGEMENT.WORK_LOAD_LIST)
  getWorkload({ query }) {
    return this.taskManagementService.getWorkload(query);
  }
}
