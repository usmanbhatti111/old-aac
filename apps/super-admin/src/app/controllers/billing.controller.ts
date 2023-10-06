import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RMQ_MESSAGES } from '@shared/constants';
import { BillingService } from '../services/billing.service';
import { AssignOrganizationPlanDto } from '@shared/dto';

@Controller()
export class BillingController {
  constructor(private readonly billingService: BillingService) {}

  @MessagePattern({ cmd: RMQ_MESSAGES.BILLING.ASSIGN_PLAN })
  async assignPlan(@Payload() payload: AssignOrganizationPlanDto) {
    return this.billingService.assignPlan(payload);
  }

  @MessagePattern({ cmd: RMQ_MESSAGES.BILLING.BILLING_DETAILS })
  async billingDetails(@Payload() payload: AssignOrganizationPlanDto) {
    return this.billingService.billingDetails(payload);
  }

  @MessagePattern({ cmd: RMQ_MESSAGES.BILLING.ADD_DISCOUNT })
  async addDiscount(@Payload() payload: AssignOrganizationPlanDto) {
    return this.billingService.addDiscount(payload);
  }
}
