import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { TwilioService } from 'nestjs-twilio';
import { ResponseMessage, successResponse } from '@shared/constants';
import {
  AddNewOutgoingCallerDto,
  CreateScheduledCallDTO,
  GetAllScheduledCallDTO,
  GetNumbersListDto,
  InitiateCallDto,
  UpdateCallStatusDto,
  UpdateScheduledCallDTO,
  VerifyPhoneNumberDto,
  callLogsDto,
  sendVerificationTokenDto,
  verifyNumberToken,
} from '@shared/dto';
import { ScheduleCallRepository } from '@shared';
import dayjs from 'dayjs';

@Injectable()
export class CallsService {
  constructor(
    private readonly twilioService: TwilioService,
    private readonly scheduleCallRepository: ScheduleCallRepository
  ) {}
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

  async getCallLogs(payload: callLogsDto) {
    try {
      const { limit = 10, to, from } = payload;
      const params = {
        limit: limit,
        to: to,
        from: from,
      };
      const call = await this.twilioService.client.calls.list(params);
      if (!call) {
        throw new HttpException('No Call Logs', HttpStatus.BAD_REQUEST);
      }
      return successResponse(HttpStatus.OK, ResponseMessage.SUCCESS, call);
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

  async callCanceledCompleted(payload: UpdateCallStatusDto) {
    try {
      const { callSid, status } = payload;
      const call = await this.twilioService.client.calls(callSid).update({
        status: status,
        //canceled before call attendend || completed after call accept
      });
      if (!call) {
        throw new HttpException(
          'Failed to update the call STATUS',
          HttpStatus.BAD_REQUEST
        );
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

  async createScheduledCall(payload: CreateScheduledCallDTO) {
    try {
      const result = await this.scheduleCallRepository.create(payload);
      return successResponse(HttpStatus.OK, ResponseMessage.SUCCESS, result);
    } catch (error) {
      Logger.log(error);
      throw new RpcException(error);
    }
  }

  async getAllScheduledCall(payload: GetAllScheduledCallDTO) {
    try {
      const {
        page,
        limit,
        organizationId,
        search,
        status,
        startDate,
        endDate,
      } = payload;
      let filterQuery = {};
      const offset = (page - 1) * limit;

      if (search) {
        filterQuery = {
          $or: [{ title: { $regex: search, $options: 'i' } }],
        };
      }

      if (status) {
        filterQuery['status'] = status;
      }

      if (startDate) {
        const filterStartDate = dayjs(startDate).startOf('day').toDate();
        filterQuery['createdAt'] = {
          ...filterQuery['createdAt'],
          $gte: filterStartDate,
        };
      }

      if (endDate) {
        const filterEndDate = dayjs(endDate).endOf('day').toDate();
        filterQuery['createdAt'] = {
          ...filterQuery['createdAt'],
          $lte: filterEndDate,
        };
      }

      const pipelines = [
        {
          $match: {
            organizationId: organizationId,
            isDeleted: false,
          },
        },
        {
          $lookup: {
            from: 'users',
            as: 'scheduledByUsers',
            let: { scheduledBy: '$scheduledBy' },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ['$_id', '$$scheduledBy'],
                  },
                },
              },
              {
                $project: {
                  fullName: {
                    $concat: [
                      '$firstName',
                      ' ',
                      '$middleName',
                      ' ',
                      '$lastName',
                    ],
                  },
                },
              },
            ],
          },
        },
        {
          $addFields: {
            scheduledByUsers: {
              $arrayElemAt: ['$scheduledByUsers', 0],
            },
          },
        },
        {
          $lookup: {
            from: 'deals',
            as: 'deals',
            let: { dealId: '$dealId' },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ['$_id', '$$dealId'],
                  },
                },
              },
              {
                $project: {
                  title: 1,
                },
              },
            ],
          },
        },
        {
          $addFields: {
            deals: {
              $arrayElemAt: ['$deals', 0],
            },
          },
        },
        {
          $project: {
            updatedAt: 0,
          },
        },
        {
          $match: filterQuery,
        },
      ];

      const params = {
        pipelines,
        offset,
        limit,
      };
      const result = await this.scheduleCallRepository.paginate(params);
      return successResponse(HttpStatus.OK, ResponseMessage.SUCCESS, result);
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async updateScheduledCall(payload: UpdateScheduledCallDTO) {
    try {
      const { id } = payload;
      delete payload.id;

      const filterQuery = {
        _id: id,
      };
      const result = await this.scheduleCallRepository.findOneAndUpdate(
        filterQuery,
        payload
      );
      return successResponse(HttpStatus.OK, ResponseMessage.SUCCESS, result);
    } catch (error) {
      Logger.log(error);
      throw new RpcException(error);
    }
  }

  async deleteScheduledCall(payload) {
    try {
      const { id, userId } = payload;

      const filterQuery = {
        _id: id,
        // isDeleted: false,
      };

      const params = {
        isDeleted: true,
        deletedBy: userId,
      };

      const response = await this.scheduleCallRepository.findOneAndUpdate(
        filterQuery,
        params
      );
      return successResponse(HttpStatus.OK, ResponseMessage.SUCCESS, response);
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async addAttendees(payload: any) {
    try {
      const { id, attendees } = payload;
      const filterQuery = {
        _id: id,
        isDeleted: false,
      };
      const result = await this.scheduleCallRepository.findOneAndUpdate(
        filterQuery,
        {
          $push: {
            attendees: attendees,
          },
        }
      );
      return successResponse(HttpStatus.OK, ResponseMessage.SUCCESS, result);
    } catch (error) {
      throw new RpcException(error);
    }
  }
  async deleteAttendees(payload: any) {
    try {
      const { id, attendeesId } = payload;
      const filterQuery = {
        _id: id,
        isDeleted: false,
      };

      const result = await this.scheduleCallRepository.findOneAndUpdate(
        filterQuery,
        {
          $pull: {
            attendees: attendeesId,
          },
        }
      );
      return successResponse(HttpStatus.OK, ResponseMessage.SUCCESS, result);
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
