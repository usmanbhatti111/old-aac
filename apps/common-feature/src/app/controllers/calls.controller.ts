import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RMQ_MESSAGES } from '@shared/constants';
import { CallsService } from '../services/calls.service';
import {
  AddNewOutgoingCallerDto,
  CreateScheduledCallDTO,
  GetAllScheduledCallDTO,
  GetNumbersListDto,
  InitiateCallDto,
  UpdateCallStatusDto,
  UpdateScheduledCallDTO,
  VerifyPhoneNumberDto,
  addAttendeesDto,
  callLogsDto,
  sendVerificationTokenDto,
  verifyNumberToken,
} from '@shared/dto';

@Controller()
export class CallsController {
  constructor(private readonly callsServices: CallsService) {}

  @MessagePattern({ cmd: RMQ_MESSAGES.CALLS.GET_NUMBERS_LIST })
  async getNumbersList(@Payload() payload: GetNumbersListDto) {
    return this.callsServices.getNumbersList(payload);
  }

  @MessagePattern({ cmd: RMQ_MESSAGES.CALLS.INITIATE_CALL })
  async initiateCall(@Payload() payload: InitiateCallDto) {
    return this.callsServices.initiateCall(payload);
  }

  @MessagePattern({ cmd: RMQ_MESSAGES.CALLS.GET_CALL_LOGS })
  async getCallLogs(@Payload() payload: callLogsDto) {
    return this.callsServices.getCallLogs(payload);
  }

  @MessagePattern({ cmd: RMQ_MESSAGES.CALLS.CALL_CANCELED_COMPLETED })
  async callCanceledCompleted(@Payload() payload: UpdateCallStatusDto) {
    return this.callsServices.callCanceledCompleted(payload);
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

  @MessagePattern({ cmd: RMQ_MESSAGES.CALLS.CREATE_SCHEDULED_CALL })
  async createScheduledCall(@Payload() payload: CreateScheduledCallDTO) {
    return this.callsServices.createScheduledCall(payload);
  }

  @MessagePattern({ cmd: RMQ_MESSAGES.CALLS.GET_ALL_SCHEDULED_CALL })
  async getAllScheduledCall(@Payload() payload: GetAllScheduledCallDTO) {
    return this.callsServices.getAllScheduledCall(payload);
  }

  @MessagePattern({ cmd: RMQ_MESSAGES.CALLS.UPDATE_SCHEDULED_CALL })
  async updateScheduledCall(@Payload() payload: UpdateScheduledCallDTO) {
    return this.callsServices.updateScheduledCall(payload);
  }

  @MessagePattern({ cmd: RMQ_MESSAGES.CALLS.DELETE_SCHEDULED_CALL })
  async deleteScheduledCall(@Payload() payload) {
    return this.callsServices.deleteScheduledCall(payload);
  }

  @MessagePattern({ cmd: RMQ_MESSAGES.CALLS.ADD_ATTENDEES_CALL })
  async addAttendees(@Payload() payload: addAttendeesDto) {
    return this.callsServices.addAttendees(payload);
  }

  @MessagePattern({ cmd: RMQ_MESSAGES.CALLS.DELETE_ATTENDEES_CALL })
  async deleteAttendees(@Payload() payload) {
    return this.callsServices.deleteAttendees(payload);
  }
}
