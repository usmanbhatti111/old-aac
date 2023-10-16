import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RMQ_MESSAGES } from '@shared/constants';
import { GetAllInvoicesDto, GetInvoiceDto, PayNowDto } from '@shared/dto';
import { InvoiceService } from '../services/invoice.service';

@Controller()
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @MessagePattern({ cmd: RMQ_MESSAGES.ORG_ADMIN.INVOICES.GET_ALL_INVOICES })
  async getAllInvoices(@Payload() payload: GetAllInvoicesDto) {
    return this.invoiceService.getAllInvoices(payload);
  }

  @MessagePattern({ cmd: RMQ_MESSAGES.ORG_ADMIN.INVOICES.GET_ONE_INVOICE })
  async getOneInvoice(@Payload() payload: GetInvoiceDto) {
    return this.invoiceService.getOneInvoice(payload);
  }

  @MessagePattern({ cmd: RMQ_MESSAGES.ORG_ADMIN.INVOICES.PAY_NOW_INVOICE })
  async payNowInvoice(@Payload() payload: PayNowDto) {
    return this.invoiceService.payNowInvoice(payload);
  }
}
