import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RMQ_MESSAGES } from '@shared/constants';
import { AssignOrgPlanDto, CreateInvoiceDto, ListOrgPlan } from '@shared/dto';
import { InvoiceService } from '../services/invoice.service';

@Controller()
export class InvoiceController {
  constructor(private readonly billingService: InvoiceService) {}

  @MessagePattern({
    cmd: RMQ_MESSAGES.SUPER_ADMIN.BILLING_INVOICES.ASSIGN_PLAN,
  })
  async assignPlan(@Payload() payload: AssignOrgPlanDto) {
    return this.billingService.assignPlan(payload);
  }

  @MessagePattern({
    cmd: RMQ_MESSAGES.SUPER_ADMIN.BILLING_INVOICES.GET_ORG_PLAN,
  })
  async getOrgPlan(@Payload() organizationPlanId: string) {
    return this.billingService.getOrgPlan(organizationPlanId);
  }

  @MessagePattern({
    cmd: RMQ_MESSAGES.SUPER_ADMIN.BILLING_INVOICES.LIST_ORG_PLAN,
  })
  async listOrgPlan(@Payload() payload: ListOrgPlan) {
    return this.billingService.listOrgPlan(payload);
  }

  @MessagePattern({
    cmd: RMQ_MESSAGES.SUPER_ADMIN.BILLING_INVOICES.GENERATE_INVOICE,
  })
  async generateInvoice(@Payload() payload: CreateInvoiceDto) {
    return this.billingService.generateInvoice(payload);
  }
}
