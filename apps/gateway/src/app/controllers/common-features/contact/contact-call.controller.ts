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
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  API_ENDPOINTS,
  API_TAGS,
  CONTROLLERS,
  RMQ_MESSAGES,
  SERVICES,
} from '@shared/constants';
import {
  ContactCallFilterDto,
  ContactCallIdParamDto,
  CreateContactCallDto,
  CreateContactCallResponseDto,
  EditContactCallDto,
  EditContactCallResponseDto,
  GetContactCallResponseDto,
  GetContactCallStatusResponseDto,
  GetContactCallsResponseDto,
  PostResponseDto,
  RescheduleContactCallDto,
  ResetOutcomeContactCallDto,
} from '@shared/dto';
import { firstValueFrom } from 'rxjs';
import { Auth } from '../../../decorators/auth.decorator';
import { AppRequest } from '../../../shared/interface/request.interface';

@ApiTags(API_TAGS.CONTACT_CALL)
@Controller(CONTROLLERS.CONTACT_CALL)
@ApiBearerAuth()
export class ContactCallController {
  constructor(
    @Inject(SERVICES.COMMON_FEATURE) private commonFeatureClient: ClientProxy
  ) {}

  @Auth(true)
  @Post(API_ENDPOINTS.CONTACT.CONTACT_CALL.CREATE_CONTACT_CALL)
  @ApiConsumes('multipart/form-data')
  @ApiCreatedResponse({ type: CreateContactCallResponseDto })
  public async createContactCall(
    @Body() payload: CreateContactCallDto,
    @Req() req: AppRequest
  ): Promise<CreateContactCallResponseDto> {
    payload.updatedBy = req.user._id;
    const response = await firstValueFrom(
      this.commonFeatureClient.send(
        RMQ_MESSAGES.CONTACT.CONTACT_CALL.CREATE_CONTACT_CALL,
        payload
      )
    );
    return response;
  }

  @Auth(true)
  @Get(API_ENDPOINTS.CONTACT.CONTACT_CALL.CONTACT_CALL_LIST)
  @ApiOkResponse({ type: GetContactCallsResponseDto })
  public async getContactCalls(
    @Query() payload: ContactCallFilterDto
  ): Promise<GetContactCallsResponseDto> {
    const response = await firstValueFrom(
      this.commonFeatureClient.send(
        RMQ_MESSAGES.CONTACT.CONTACT_CALL.CONTACT_CALL_LIST,
        payload
      )
    );
    return response;
  }

  @Auth(true)
  @Get(API_ENDPOINTS.CONTACT.CONTACT_CALL.CONTACT_CALL)
  @ApiOkResponse({ type: GetContactCallResponseDto })
  public async getContactCall(
    @Param() param: ContactCallIdParamDto
  ): Promise<GetContactCallResponseDto> {
    const response = await firstValueFrom(
      this.commonFeatureClient.send(
        RMQ_MESSAGES.CONTACT.CONTACT_CALL.CONTACT_CALL,
        param
      )
    );
    return response;
  }

  @Auth(true)
  @Delete(API_ENDPOINTS.CONTACT.CONTACT_CALL.DELETE_CONTACT_CALL)
  @ApiOkResponse({ type: PostResponseDto })
  public async deleteContactCall(
    @Param() { contactCallId }: ContactCallIdParamDto,
    @Req() req: AppRequest
  ): Promise<PostResponseDto<any>> {
    const deletedBy = req.user._id;
    const response = await firstValueFrom(
      this.commonFeatureClient.send(
        RMQ_MESSAGES.CONTACT.CONTACT_CALL.DELETE_CONTACT_CALL,
        {
          contactCallId,
          deletedBy,
        }
      )
    );
    return response;
  }

  @Auth(true)
  @Patch(API_ENDPOINTS.CONTACT.CONTACT_CALL.EDIT_CONTACT_CALL)
  @ApiConsumes('multipart/form-data')
  @ApiCreatedResponse({ type: EditContactCallResponseDto })
  public async updateContactCall(
    @Param() { contactCallId }: ContactCallIdParamDto,
    @Body() payload: EditContactCallDto,
    @Req() req: AppRequest
  ): Promise<EditContactCallResponseDto> {
    payload.contactCallId = contactCallId;
    payload.updatedBy = req.user._id;
    const response = await firstValueFrom(
      this.commonFeatureClient.send(
        RMQ_MESSAGES.CONTACT.CONTACT_CALL.EDIT_CONTACT_CALL,
        payload
      )
    );
    return response;
  }

  @Auth(true)
  @Patch(API_ENDPOINTS.CONTACT.CONTACT_CALL.RESCHEDULE_CONTACT_CALL)
  @ApiCreatedResponse({ type: EditContactCallResponseDto })
  public async rescheduleContactCall(
    @Param() { contactCallId }: ContactCallIdParamDto,
    @Body() payload: RescheduleContactCallDto,
    @Req() req: AppRequest
  ): Promise<EditContactCallResponseDto> {
    payload.contactCallId = contactCallId;
    payload.updatedBy = req.user._id;
    const response = await firstValueFrom(
      this.commonFeatureClient.send(
        RMQ_MESSAGES.CONTACT.CONTACT_CALL.RESCHEDULE_CONTACT_CALL,
        payload
      )
    );
    return response;
  }

  @Auth(true)
  @Patch(API_ENDPOINTS.CONTACT.CONTACT_CALL.RESET_OUTCOME_CONTACT_CALL)
  @ApiCreatedResponse({ type: EditContactCallResponseDto })
  @ApiConsumes('multipart/form-data')
  public async resetOutcomeContactCall(
    @Param() { contactCallId }: ContactCallIdParamDto,
    @Body() payload: ResetOutcomeContactCallDto,
    @Req() req: AppRequest
  ): Promise<EditContactCallResponseDto> {
    payload.contactCallId = contactCallId;
    payload.updatedBy = req.user._id;
    const response = await firstValueFrom(
      this.commonFeatureClient.send(
        RMQ_MESSAGES.CONTACT.CONTACT_CALL.RESET_OUTCOME_CONTACT_CALL,
        payload
      )
    );
    return response;
  }

  @Auth(true)
  @Get(API_ENDPOINTS.CONTACT.CONTACT_CALL.CONTACT_CALL_STATUS)
  @ApiOkResponse({ type: GetContactCallStatusResponseDto })
  public async getContactCallsStatus(
    @Param() param: ContactCallIdParamDto
  ): Promise<GetContactCallStatusResponseDto> {
    const response = await firstValueFrom(
      this.commonFeatureClient.send(
        RMQ_MESSAGES.CONTACT.CONTACT_CALL.CONTACT_CALL,
        param
      )
    );
    return response;
  }
}
