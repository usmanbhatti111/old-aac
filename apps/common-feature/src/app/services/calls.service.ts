import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { TwilioService } from 'nestjs-twilio';
import { ResponseMessage, successResponse } from '@shared/constants';
import {
  AddNewOutgoingCallerDto,
  GetNumbersListDto,
  InitiateCallDto,
  VerifyPhoneNumberDto,
  sendVerificationTokenDto,
  verifyNumberToken,
} from '@shared/dto';

@Injectable()
export class CallsService {
  constructor(private readonly twilioService: TwilioService) {}

  async getNumbersList(payload: GetNumbersListDto) {
    try {
      const { locality } = payload;
      let filterQuery = {};

      if (locality) {
        filterQuery = {
          inLocality: locality,
        };
      }
      const numbers = await this.twilioService.client
        .availablePhoneNumbers('GB')
        .local.list(filterQuery);
      return successResponse(HttpStatus.OK, ResponseMessage.SUCCESS, numbers);
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async initiateCall(payload: InitiateCallDto) {
    try {
      const { callTo, callFrom } = payload;
      // const callFrom = '+18036102922';
      const params = {
        url: 'http://demo.twilio.com/docs/voice.xml', // Your TwiML URL
        to: callTo, // Replace with the client's number
        from: callFrom, // Replace with the selected number from the list
        method: 'POST', // Required to send custom TwiML
        body: `<?xml version="1.0" encoding="UTF-8"?><Response><Dial>${callTo}</Dial></Response>`,
      };
      const call = await this.twilioService.client.calls.create(params);
      if (!call) {
        throw new HttpException('No Call Response', HttpStatus.BAD_REQUEST);
      }
      return successResponse(HttpStatus.OK, ResponseMessage.SUCCESS, call);
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async verifyphoneNumber(payload: VerifyPhoneNumberDto) {
    try {
      const { verifyPhoneNumber } = payload;
      const params: any = {
        to: verifyPhoneNumber,
        channel: 'call',
        method: 'GET',
      };
      const verification = await this.twilioService.client.verify.v2.create(
        params
      );
      return successResponse(
        HttpStatus.OK,
        ResponseMessage.SUCCESS,
        verification
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async addNewOutgoingCaller(payload: AddNewOutgoingCallerDto) {
    try {
      const { friendlyName, phoneNumber } = payload;
      const params: any = {
        friendlyName: friendlyName,
        phoneNumber: phoneNumber,
      };
      const addNewOutgoingCaller =
        await this.twilioService.client.validationRequests.create(params);
      return successResponse(
        HttpStatus.OK,
        ResponseMessage.SUCCESS,
        addNewOutgoingCaller
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async sendVerificationToken(payload: sendVerificationTokenDto) {
    try {
      const serviceSID = process.env.TWILIO_SERVICE_SID;
      const { phoneNumber, channel } = payload;
      const params: any = {
        to: phoneNumber,
        channel: channel,
      };
      const response = await this.twilioService.client.verify.v2
        .services(serviceSID)
        .verifications.create(params);
      return successResponse(HttpStatus.OK, ResponseMessage.SUCCESS, response);
    } catch (error) {
      Logger.log(error);
      throw new RpcException(error);
    }
  }

  async verifyNumberToken(payload: verifyNumberToken) {
    try {
      const { phoneNumber, code } = payload;
      const serviceSID = process.env.TWILIO_SERVICE_SID;
      const verificationCheck = await this.twilioService.client.verify.v2
        .services(serviceSID)
        .verificationChecks.create({ to: phoneNumber, code: code });

      if (!verificationCheck.sid) {
        throw new HttpException('No Valid Response', HttpStatus.BAD_REQUEST);
      }
      return successResponse(
        HttpStatus.OK,
        ResponseMessage.SUCCESS,
        verificationCheck
      );
    } catch (error) {
      Logger.log(error);
      throw new RpcException(error);
    }
  }
}
