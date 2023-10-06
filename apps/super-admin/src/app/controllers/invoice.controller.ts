import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RMQ_MESSAGES } from '@shared/constants';
import { AssignOrganizationPlanDto } from '@shared/dto';
import { InvoiceService } from '../services/invoice.service';

@Controller()
export class InvoiceController {
  constructor(private readonly billingService: InvoiceService) {}

  @MessagePattern({
    cmd: RMQ_MESSAGES.SUPER_ADMIN.BILLING_INVOICES.ASSIGN_PLAN,
  })
  async assignPlan(@Payload() payload: AssignOrganizationPlanDto) {
    return this.billingService.assignPlan(payload);
  }
}
