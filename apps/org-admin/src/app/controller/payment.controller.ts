import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RMQ_MESSAGES } from '@shared/constants';
import {
  AddPaymentMethodDto,
  GetOnePaymentDto,
  UpdatePaymentMethodDto,
  getAllPaymentsDTO,
} from '@shared/dto';
import { PaymentService } from '../services/payment.service';

@Controller()
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @MessagePattern({ cmd: RMQ_MESSAGES.ORG_ADMIN.PAYMENTS.ADD_PAYMENT })
  async addPayment(@Payload() payload: AddPaymentMethodDto) {
    return this.paymentService.addPayment(payload);
  }

  @MessagePattern({ cmd: RMQ_MESSAGES.ORG_ADMIN.PAYMENTS.UPDATE_PAYMENT })
  async updatePayment(@Payload() payload: UpdatePaymentMethodDto) {
    return this.paymentService.updatePayment(payload);
  }

  @MessagePattern({ cmd: RMQ_MESSAGES.ORG_ADMIN.PAYMENTS.GET_ALL_PAYMENTS })
  async getAllPayments(@Payload() payload: getAllPaymentsDTO) {
    return this.paymentService.getAllPayments(payload);
  }

  @MessagePattern({ cmd: RMQ_MESSAGES.ORG_ADMIN.PAYMENTS.GET_ONE_PAYMENTS })
  async getOnePayment(@Payload() payload: GetOnePaymentDto) {
    return this.paymentService.getOnePayment(payload);
  }

  @MessagePattern({ cmd: RMQ_MESSAGES.ORG_ADMIN.PAYMENTS.DELETE_ONE_PAYMENTS })
  async deleteOnePayment(@Payload() payload: GetOnePaymentDto) {
    return this.paymentService.deleteOnePayment(payload);
  }

}
