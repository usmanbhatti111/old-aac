import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import {
  API_ENDPOINTS,
  API_TAGS,
  CONTROLLERS,
  EActivityType,
  EActivitylogModule,
  RMQ_MESSAGES,
  SERVICES,
} from '@shared/constants';
import {
  ActivityLogParams,
  AddNewOutgoingCallerDto,
  AddNewOutgoingCallerResponseDto,
  CallCancelCompleteResponseDto,
  CreateScheduledCallDTO,
  CreateScheduledCallResponseDTO,
  GetAllScheduledCallDTO,
  GetAllScheduledCallDTOResponseDto,
  GetCalLogsResponseDto,
  GetNumbersListDto,
  GetNumbersListResponseDto,
  InitiateCallDto,
  InitiateCallResponseDto,
  UpdateCallStatusDto,
  UpdateScheduledCallDTO,
  VerifyPhoneNumberDto,
  VerifyPhoneNumberResponseDto,
  addAttendeesDto,
  addAttendeesResponseDto,
  attendeesIdDto,
  callLogsDto,
  scheduleCallId,
  sendVerificationTokenDto,
  sendVerificationTokenResponseDto,
  verifyNumberToken,
  verifyNumberTokenResponseDto,
} from '@shared/dto';
import { firstValueFrom } from 'rxjs';
import { Auth } from '../../decorators/auth.decorator';
import { AppRequest } from '../../shared/interface/request.interface';

@ApiTags(API_TAGS.CALLS)
@Controller(CONTROLLERS.CALLS)
export class CallsController {
  constructor(
    @Inject(SERVICES.COMMON_FEATURE) private commonFeatureClient: ClientProxy
  ) {}

  @Get(API_ENDPOINTS.CALLS.GET_NUMBERS_LIST)
  @ApiCreatedResponse({ type: GetNumbersListResponseDto })
  public async getNumbersList(
    @Query() payload: GetNumbersListDto,
    @Req() request: AppRequest
  ): Promise<GetNumbersListResponseDto> {
    const { user } = request;
    const organizationId = user?.organization;

    const response = await firstValueFrom(
      this.commonFeatureClient.send(
        { cmd: RMQ_MESSAGES.CALLS.GET_NUMBERS_LIST },
        {
          ...payload,
          organizationId: organizationId,
        }
      )
    );
    return response;
  }

  @Post(API_ENDPOINTS.CALLS.INITIATE_CALL)
  @Auth(true)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: InitiateCallResponseDto })
  public async initiateCall(
    @Query() payload: InitiateCallDto,
    @Req() request: AppRequest
  ): Promise<InitiateCallResponseDto> {
    const { user } = request;
    const organizationId = user?.organization;
    const callBy = user?._id;
    const response = await firstValueFrom(
      this.commonFeatureClient.send(
        { cmd: RMQ_MESSAGES.CALLS.INITIATE_CALL },
        {
          ...payload,
          organizationId,
          callBy,
        }
      )
    );

    //ActivityLog
    if (response?.data) {
      const params: ActivityLogParams = {
        performedBy: user?._id,
        activityType: EActivityType.CREATED,
        module: EActivitylogModule.CALLS,
        moduleId: response?.data?._id,
        moduleName: 'Initiate  Call',
      };

      await firstValueFrom(
        this.commonFeatureClient.emit(RMQ_MESSAGES.ACTIVITY_LOG.ACTIVITY_LOG, {
          ...params,
        })
      );
      response.data.activity = true;
    }

    return response;
  }

  @Post(API_ENDPOINTS.CALLS.CALL_CANCELED_COMPLETED)
  @Auth(true)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: CallCancelCompleteResponseDto })
  public async callCanceledCompleted(
    @Query() payload: UpdateCallStatusDto,
    @Req() request: AppRequest
  ): Promise<CallCancelCompleteResponseDto> {
    const { user } = request;
    const organizationId = user?.organization;
    const response = await firstValueFrom(
      this.commonFeatureClient.send(
        { cmd: RMQ_MESSAGES.CALLS.CALL_CANCELED_COMPLETED },
        {
          ...payload,
          organizationId,
          createdBy: user?._id,
        }
      )
    );

    //ActivityLog
    if (response?.data) {
      const params: ActivityLogParams = {
        performedBy: user?._id,
        activityType: EActivityType.UPDATED,
        module: EActivitylogModule.CALLS,
        moduleId: response?.data?._id,
        moduleName: 'Call Updated',
      };
      firstValueFrom(
        this.commonFeatureClient.emit(RMQ_MESSAGES.ACTIVITY_LOG.ACTIVITY_LOG, {
          ...params,
        })
      );
      response.data.activity = true;
    }
    return response;
  }

  @Get(API_ENDPOINTS.CALLS.GET_CALL_LOGS)
  @ApiCreatedResponse({ type: GetCalLogsResponseDto })
  public async getCallLogs(
    @Query() payload: callLogsDto
  ): Promise<GetCalLogsResponseDto> {
    const response = await firstValueFrom(
      this.commonFeatureClient.send(
        { cmd: RMQ_MESSAGES.CALLS.GET_CALL_LOGS },
        { ...payload }
      )
    );
    return response;
  }

  @Post(API_ENDPOINTS.CALLS.VERIFY_PHONE_NUMBER)
  @ApiCreatedResponse({ type: VerifyPhoneNumberResponseDto })
  public async verifyphoneNumber(
    @Query() payload: VerifyPhoneNumberDto,
    @Req() request: AppRequest
  ): Promise<VerifyPhoneNumberResponseDto> {
    const { user } = request;
    const organizationId = user?.organization;
    const verifyBy = user?._id;

    const response = await firstValueFrom(
      this.commonFeatureClient.send(
        { cmd: RMQ_MESSAGES.CALLS.VERIFY_PHONE_NUMBER },
        {
          ...payload,
          organizationId,
          verifyBy,
        }
      )
    );

    return response;
  }

  @Post(API_ENDPOINTS.CALLS.NEW_OUTGOING_CALLER)
  @Auth(true)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: AddNewOutgoingCallerResponseDto })
  public async addNewOutgoingCaller(
    @Query() payload: AddNewOutgoingCallerDto,
    @Req() request: AppRequest
  ): Promise<AddNewOutgoingCallerResponseDto> {
    const { user } = request;
    const organizationId = user?.organization;
    const response = await firstValueFrom(
      this.commonFeatureClient.send(
        { cmd: RMQ_MESSAGES.CALLS.NEW_OUTGOING_CALLER },
        {
          ...payload,
          organizationId,
        }
      )
    );

    //ActivityLog
    if (response?.data) {
      const params: ActivityLogParams = {
        performedBy: user?._id,
        activityType: EActivityType.CREATED,
        module: EActivitylogModule.CALLS,
        moduleId: response?.data?._id,
        moduleName: 'Add New Caller',
      };
      firstValueFrom(
        this.commonFeatureClient.emit(RMQ_MESSAGES.ACTIVITY_LOG.ACTIVITY_LOG, {
          ...params,
        })
      );
      response.data.activity = true;
    }

    return response;
  }

  @Post(API_ENDPOINTS.CALLS.SEND_VERIFICATION_TOKEN)
  // @Auth(true)
  @ApiCreatedResponse({ type: sendVerificationTokenResponseDto })
  public async sendVerificationToken(
    @Query() payload: sendVerificationTokenDto,
    @Req() request: AppRequest
  ): Promise<sendVerificationTokenResponseDto> {
    const { user } = request;
    const organizationId = user?.organization;

    const response = await firstValueFrom(
      this.commonFeatureClient.send(
        { cmd: RMQ_MESSAGES.CALLS.SEND_VERIFICATION_TOKEN },
        {
          ...payload,
          organizationId,
        }
      )
    );
    return response;
  }

  @Post(API_ENDPOINTS.CALLS.VERIFY_NUMBER_TOKEN)
  // @Auth(true)
  @ApiCreatedResponse({ type: verifyNumberTokenResponseDto })
  public async verifyNumberToken(
    @Query() payload: verifyNumberToken,
    @Req() request: AppRequest
  ) {
    const { user } = request;
    const organizationId = user?.organization;
    const response = await firstValueFrom(
      this.commonFeatureClient.send(
        { cmd: RMQ_MESSAGES.CALLS.VERIFY_NUMBER_TOKEN },
        {
          ...payload,
          organizationId,
        }
      )
    );
    return response;
  }

  /*CRUD of schedule call*/

  @Post()
  @Auth(true)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: CreateScheduledCallResponseDTO })
  public async createScheduledCall(
    @Query() payload: CreateScheduledCallDTO,
    @Req() request: AppRequest
  ): Promise<CreateScheduledCallResponseDTO> {
    const { user } = request;
    const organizationId = user?.organization;
    const response = await firstValueFrom(
      this.commonFeatureClient.send(
        { cmd: RMQ_MESSAGES.CALLS.CREATE_SCHEDULED_CALL },
        {
          ...payload,
          organizationId,
          scheduledBy: user?._id,
        }
      )
    );

    //ActivityLog
    if (response?.data) {
      const params: ActivityLogParams = {
        performedBy: user?._id,
        activityType: EActivityType.CREATED,
        module: EActivitylogModule.CALLS,
        moduleId: response?.data?._id,
        moduleName: 'Schedule a Call',
      };
      firstValueFrom(
        this.commonFeatureClient.emit(RMQ_MESSAGES.ACTIVITY_LOG.ACTIVITY_LOG, {
          ...params,
        })
      );
      response.data.activity = true;
    }

    return response;
  }

  @Get()
  @Auth(true)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: GetAllScheduledCallDTOResponseDto })
  public async getAllScheduledCall(
    @Query() payload: GetAllScheduledCallDTO,
    @Req() request: AppRequest
  ): Promise<GetAllScheduledCallDTOResponseDto> {
    const { user } = request;
    const organizationId = user?.organization;
    const response = await firstValueFrom(
      this.commonFeatureClient.send(
        { cmd: RMQ_MESSAGES.CALLS.GET_ALL_SCHEDULED_CALL },
        {
          ...payload,
          organizationId,
          userId: user?._id,
        }
      )
    );
    return response;
  }

  @Patch(API_ENDPOINTS.CALLS.UPDATE_ONE)
  @Auth(true)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: CreateScheduledCallResponseDTO })
  public async updateScheduledCall(
    @Param() id: scheduleCallId,
    @Body() payload: UpdateScheduledCallDTO,
    @Req() request: AppRequest
  ): Promise<CreateScheduledCallResponseDTO> {
    const { user } = request;
    const organizationId = user?.organization;
    const response = await firstValueFrom(
      this.commonFeatureClient.send(
        { cmd: RMQ_MESSAGES.CALLS.UPDATE_SCHEDULED_CALL },
        {
          ...payload,
          organizationId,
          id: id.id,
          userId: user?._id,
        }
      )
    );

    //ActivityLog
    if (response?.data) {
      const params: ActivityLogParams = {
        performedBy: user?._id,
        activityType: EActivityType.UPDATED,
        module: EActivitylogModule.CALLS,
        moduleId: response?.data?._id,
        moduleName: 'Schedule a Call',
      };
      firstValueFrom(
        this.commonFeatureClient.emit(RMQ_MESSAGES.ACTIVITY_LOG.ACTIVITY_LOG, {
          ...params,
        })
      );
      response.data.activity = true;
    }

    return response;
  }

  @Delete(API_ENDPOINTS.CALLS.DELETE_ONE)
  @Auth(true)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: CreateScheduledCallResponseDTO })
  public async deleteScheduledCall(
    @Param() id: scheduleCallId,
    @Req() request: AppRequest
  ): Promise<CreateScheduledCallResponseDTO> {
    const { user } = request;
    const organizationId = user?.organization;
    const response = await firstValueFrom(
      this.commonFeatureClient.send(
        { cmd: RMQ_MESSAGES.CALLS.DELETE_SCHEDULED_CALL },
        { organizationId, id: id.id, userId: user?._id }
      )
    );

    //ActivityLog
    if (response?.data) {
      const params: ActivityLogParams = {
        performedBy: user?._id,
        activityType: EActivityType.DELETED,
        module: EActivitylogModule.CALLS,
        moduleId: response?.data?._id,
        moduleName: 'Delete Schedule Call',
      };
      firstValueFrom(
        this.commonFeatureClient.emit(RMQ_MESSAGES.ACTIVITY_LOG.ACTIVITY_LOG, {
          ...params,
        })
      );
      response.data.activity = true;
    }

    return response;
  }

  @Post(API_ENDPOINTS.CALLS.ADD_ATTENDEES)
  @Auth(true)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: addAttendeesResponseDto })
  public async addAttendees(
    @Query() id: scheduleCallId,
    @Body() payload: addAttendeesDto,
    @Req() request: AppRequest
  ): Promise<addAttendeesResponseDto> {
    const { user } = request;
    const organizationId = user?.organization;
    const response = await firstValueFrom(
      this.commonFeatureClient.send(
        { cmd: RMQ_MESSAGES.CALLS.ADD_ATTENDEES_CALL },
        {
          ...payload,
          id: id?.id,
          organizationId,
          createdBy: user?._id,
        }
      )
    );

    //ActivityLog
    if (response?.data) {
      const params: ActivityLogParams = {
        performedBy: user?._id,
        activityType: EActivityType.UPDATED,
        module: EActivitylogModule.CALLS,
        moduleId: response?.data?._id,
        moduleName: 'Add Assignee',
      };
      firstValueFrom(
        this.commonFeatureClient.emit(RMQ_MESSAGES.ACTIVITY_LOG.ACTIVITY_LOG, {
          ...params,
        })
      );
      response.data.activity = true;
    }

    return response;
  }

  @Delete(API_ENDPOINTS.CALLS.DELETE_ATTENDEES)
  @Auth(true)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: addAttendeesResponseDto })
  public async deleteAttendees(
    @Param() id: scheduleCallId,
    @Param() attendeesId: attendeesIdDto,
    @Req() request: AppRequest
  ): Promise<addAttendeesResponseDto> {
    const { user } = request;
    const organizationId = user?.organization;
    const response = await firstValueFrom(
      this.commonFeatureClient.send(
        { cmd: RMQ_MESSAGES.CALLS.DELETE_ATTENDEES_CALL },
        {
          attendeesId: attendeesId?.attendeesId,
          id: id?.id,
          organizationId,
          createdBy: user?._id,
        }
      )
    );

    //ActivityLog
    if (response?.data) {
      const params: ActivityLogParams = {
        performedBy: user?._id,
        activityType: EActivityType.DELETED,
        module: EActivitylogModule.CALLS,
        moduleId: response?.data?._id,
        moduleName: 'Remove Assignee',
      };
      firstValueFrom(
        this.commonFeatureClient.emit(RMQ_MESSAGES.ACTIVITY_LOG.ACTIVITY_LOG, {
          ...params,
        })
      );
      response.data.activity = true;
    }
    return response;
  }
}
