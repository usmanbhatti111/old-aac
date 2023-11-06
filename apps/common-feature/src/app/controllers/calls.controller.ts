import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RMQ_MESSAGES } from '@shared/constants';
import { CallsService } from '../services/calls.service';
import {
  AddNewOutgoingCallerDto,
  GetNumbersListDto,
  InitiateCallDto,
  VerifyPhoneNumberDto,
  sendVerificationTokenDto,
  verifyNumberToken,
} from '@shared/dto';

@Controller()
export class CallsController {
  constructor(private readonly callsServices: CallsService) {}

  @MessagePattern({ cmd: RMQ_MESSAGES.CALLS.GET_NUMBERS_LIST })
  async getAllInvoices(@Payload() payload: GetNumbersListDto) {
    return this.callsServices.getNumbersList(payload);
  }

  @MessagePattern({ cmd: RMQ_MESSAGES.CALLS.INITIATE_CALL })
  async initiateCall(@Payload() payload: InitiateCallDto) {
    return this.callsServices.initiateCall(payload);
  }

  @MessagePattern({ cmd: RMQ_MESSAGES.CALLS.VERIFY_PHONE_NUMBER })
  async verifyphoneNumber(@Payload() payload: VerifyPhoneNumberDto) {
    return this.callsServices.verifyphoneNumber(payload);
  }

  @MessagePattern({ cmd: RMQ_MESSAGES.CALLS.NEW_OUTGOING_CALLER })
  async addNewOutgoingCaller(@Payload() payload: AddNewOutgoingCallerDto) {
    return this.callsServices.addNewOutgoingCaller(payload);
  }

  @MessagePattern({ cmd: RMQ_MESSAGES.CALLS.SEND_VERIFICATION_TOKEN })
  async sendVerificationToken(@Payload() payload: sendVerificationTokenDto) {
    return this.callsServices.sendVerificationToken(payload);
  }

  @MessagePattern({ cmd: RMQ_MESSAGES.CALLS.VERIFY_NUMBER_TOKEN })
  async verifyNumberToken(@Payload() payload: verifyNumberToken) {
    return this.callsServices.verifyNumberToken(payload);
  }
}
