import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RMQ_MESSAGES } from '@shared/constants';
import { SubscriptionService } from '../services/subscription.service';
import {
  AssignOrgPlanOrgAdminDto,
  UpdateAssignOrgPlanOrgAdminDto,
} from '@shared/dto';

@Controller()
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @MessagePattern({ cmd: RMQ_MESSAGES.ORG_ADMIN.INVOICES.GET_ALL_SUBSCRIPTION })
  async getAllSubscriptions(@Payload() payload) {
    return this.subscriptionService.getAllSubscriptions(payload);
  }

  @MessagePattern({ cmd: RMQ_MESSAGES.ORG_ADMIN.INVOICES.ASSIGN_PLAN })
  async assignPlan(@Payload() payload: AssignOrgPlanOrgAdminDto) {
    return this.subscriptionService.assignPlan(payload);
  }

  @MessagePattern({ cmd: RMQ_MESSAGES.ORG_ADMIN.INVOICES.UPDATE_ASSIGN_PLAN })
  async updateAssignPlan(@Payload() payload: UpdateAssignOrgPlanOrgAdminDto) {
    return this.subscriptionService.updateAssignPlan(payload);
  }
}
