import { Controller, Get, Inject, Post, Query, Req } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import {
  API_ENDPOINTS,
  API_TAGS,
  CONTROLLERS,
  RMQ_MESSAGES,
  SERVICES,
} from '@shared/constants';
import {
  AddNewOutgoingCallerDto,
  AddNewOutgoingCallerResponseDto,
  GetNumbersListDto,
  GetNumbersListResponseDto,
  InitiateCallDto,
  InitiateCallResponseDto,
  VerifyPhoneNumberDto,
  VerifyPhoneNumberResponseDto,
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
// @ApiBearerAuth()
export class CallsController {
  constructor(
    @Inject(SERVICES.COMMON_FEATURE) private commonFeatureClient: ClientProxy
  ) {}

  @Get(API_ENDPOINTS.CALLS.GET_NUMBERS_LIST)
  // @Auth(true)
  @ApiCreatedResponse({ type: GetNumbersListResponseDto })
  public async getNumbersList(
    @Query() payload: GetNumbersListDto,
    @Req() request: AppRequest
  ) {
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
  // @Auth(true)
  @ApiCreatedResponse({ type: InitiateCallResponseDto })
  public async initiateCall(
    @Query() payload: InitiateCallDto,
    @Req() request: AppRequest
  ) {
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
    return response;
  }

  @Post(API_ENDPOINTS.CALLS.VERIFY_PHONE_NUMBER)
  // @Auth(true)
  @ApiCreatedResponse({ type: VerifyPhoneNumberResponseDto })
  public async verifyphoneNumber(
    @Query() payload: VerifyPhoneNumberDto,
    @Req() request: AppRequest
  ) {
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
  @ApiCreatedResponse({ type: AddNewOutgoingCallerResponseDto })
  public async addNewOutgoingCaller(
    @Query() payload: AddNewOutgoingCallerDto,
    @Req() request: AppRequest
  ) {
    const { user } = request;
    const organizationId = user?.organization;
    // const payload={}

    const response = await firstValueFrom(
      this.commonFeatureClient.send(
        { cmd: RMQ_MESSAGES.CALLS.NEW_OUTGOING_CALLER },
        {
          ...payload,
          organizationId,
        }
      )
    );
    return response;
  }

  @Post(API_ENDPOINTS.CALLS.SEND_VERIFICATION_TOKEN)
  // @Auth(true)
  @ApiCreatedResponse({ type: sendVerificationTokenResponseDto })
  public async sendVerificationToken(
    @Query() payload: sendVerificationTokenDto,
    @Req() request: AppRequest
  ) {
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
}
