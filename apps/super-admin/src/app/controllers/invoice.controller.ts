import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RMQ_MESSAGES } from '@shared/constants';
import {
  AddDiscountDto,
  AssignOrgPlanDto,
  BillingDetailsDto,
  CreateInvoiceDto,
  ListOrgPlan,
  UpdateAssignOrgPlanSuperAdminDto,
} from '@shared/dto';
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
  async getOrgPlan(@Payload() payload: { organizationPlanId: string }) {
    return this.billingService.getOrgPlan(payload.organizationPlanId);
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

  @MessagePattern({
    cmd: RMQ_MESSAGES.SUPER_ADMIN.BILLING_INVOICES.UPDATE_ASSIGN_PLAN,
  })
  async updateAssignPlan(@Payload() payload: UpdateAssignOrgPlanSuperAdminDto) {
    return this.billingService.updateAssignPlan(payload);
  }

  @MessagePattern({
    cmd: RMQ_MESSAGES.SUPER_ADMIN.BILLING_INVOICES.BILLING_DETAILS,
  })
  async billingDetails(@Payload() payload: BillingDetailsDto) {
    return this.billingService.billingDetails(payload);
  }

  @MessagePattern({
    cmd: RMQ_MESSAGES.SUPER_ADMIN.BILLING_INVOICES.ADD_DISCOUNT,
  })
  async addDiscount(@Payload() payload: AddDiscountDto) {
    return this.billingService.addDiscount(payload);
  }
}
