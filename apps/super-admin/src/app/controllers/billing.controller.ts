import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RMQ_MESSAGES } from '@shared/constants';
import { BillingService } from '../services/billing.service';
import { AddDiscountDto, BillingDetailsDto } from '@shared/dto';

@Controller()
export class BillingController {
  constructor(private readonly billingService: BillingService) {}

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
