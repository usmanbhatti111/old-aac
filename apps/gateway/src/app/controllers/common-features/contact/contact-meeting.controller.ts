import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
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
  ContactMeetingFilterDto,
  ContactMeetingIdParamDto,
  EditContactMeetingDto,
  EditContactMeetingResponseDto,
  GetContactMeetingResponseDto,
  GetContactMeetingStatusResponseDto,
  GetContactMeetingsResponseDto,
  PostResponseDto,
  RescheduleContactMeetingDto,
  ResetOutcomeContactMeetingDto,
} from '@shared/dto';
import { firstValueFrom } from 'rxjs';
import { Auth } from '../../../decorators/auth.decorator';
import { AppRequest } from '../../../shared/interface/request.interface';

@ApiTags(API_TAGS.CONTACT_MEETING)
@Controller(CONTROLLERS.CONTACT_MEETING)
@ApiBearerAuth()
export class ContactMeetingController {
  constructor(
    @Inject(SERVICES.COMMON_FEATURE) private commonFeatureClient: ClientProxy
  ) {}

  @Auth(true)
  @Get(API_ENDPOINTS.CONTACT.CONTACT_MEETING.CONTACT_MEETING_LIST)
  @ApiConsumes('multipart/form-data')
  @ApiOkResponse({ type: GetContactMeetingsResponseDto })
  public async getContactMeetings(
    @Query() payload: ContactMeetingFilterDto
  ): Promise<GetContactMeetingsResponseDto> {
    const response = await firstValueFrom(
      this.commonFeatureClient.send(
        RMQ_MESSAGES.CONTACT.CONTACT_MEETING.CONTACT_MEETING_LIST,
        payload
      )
    );
    return response;
  }

  @Auth(true)
  @Get(API_ENDPOINTS.CONTACT.CONTACT_MEETING.CONTACT_MEETING)
  @ApiOkResponse({ type: GetContactMeetingResponseDto })
  public async getContactMeeting(
    @Param() param: ContactMeetingIdParamDto
  ): Promise<GetContactMeetingResponseDto> {
    const response = await firstValueFrom(
      this.commonFeatureClient.send(
        RMQ_MESSAGES.CONTACT.CONTACT_MEETING.CONTACT_MEETING,
        param
      )
    );
    return response;
  }

  @Auth(true)
  @Delete(API_ENDPOINTS.CONTACT.CONTACT_MEETING.DELETE_CONTACT_MEETING)
  @ApiOkResponse({ type: PostResponseDto })
  public async deleteContactMeeting(
    @Param() { contactMeetingId }: ContactMeetingIdParamDto,
    @Req() req: AppRequest
  ): Promise<PostResponseDto<any>> {
    const deletedBy = req.user._id;
    const response = await firstValueFrom(
      this.commonFeatureClient.send(
        RMQ_MESSAGES.CONTACT.CONTACT_MEETING.DELETE_CONTACT_MEETING,
        {
          contactMeetingId,
          deletedBy,
        }
      )
    );
    return response;
  }

  @Auth(true)
  @Patch(API_ENDPOINTS.CONTACT.CONTACT_MEETING.EDIT_CONTACT_MEETING)
  @ApiConsumes('multipart/form-data')
  @ApiCreatedResponse({ type: EditContactMeetingResponseDto })
  public async updateContactMeeting(
    @Param() { contactMeetingId }: ContactMeetingIdParamDto,
    @Body() payload: EditContactMeetingDto,
    @Req() req: AppRequest
  ): Promise<EditContactMeetingResponseDto> {
    payload.contactMeetingId = contactMeetingId;
    payload.updatedBy = req.user._id;
    const response = await firstValueFrom(
      this.commonFeatureClient.send(
        RMQ_MESSAGES.CONTACT.CONTACT_MEETING.EDIT_CONTACT_MEETING,
        payload
      )
    );
    return response;
  }

  @Auth(true)
  @Patch(API_ENDPOINTS.CONTACT.CONTACT_MEETING.RESCHEDULE_CONTACT_MEETING)
  @ApiCreatedResponse({ type: EditContactMeetingResponseDto })
  public async rescheduleContactMeeting(
    @Param() { contactMeetingId }: ContactMeetingIdParamDto,
    @Body() payload: RescheduleContactMeetingDto,
    @Req() req: AppRequest
  ): Promise<EditContactMeetingResponseDto> {
    payload.contactMeetingId = contactMeetingId;
    payload.updatedBy = req.user._id;
    const response = await firstValueFrom(
      this.commonFeatureClient.send(
        RMQ_MESSAGES.CONTACT.CONTACT_MEETING.RESCHEDULE_CONTACT_MEETING,
        payload
      )
    );
    return response;
  }

  @Auth(true)
  @Patch(API_ENDPOINTS.CONTACT.CONTACT_MEETING.RESET_OUTCOME_CONTACT_MEETING)
  @ApiConsumes('multipart/form-data')
  @ApiCreatedResponse({ type: EditContactMeetingResponseDto })
  public async resetOutcomeContactMeeting(
    @Param() { contactMeetingId }: ContactMeetingIdParamDto,
    @Body() payload: ResetOutcomeContactMeetingDto,
    @Req() req: AppRequest
  ): Promise<EditContactMeetingResponseDto> {
    payload.contactMeetingId = contactMeetingId;
    payload.updatedBy = req.user._id;
    const response = await firstValueFrom(
      this.commonFeatureClient.send(
        RMQ_MESSAGES.CONTACT.CONTACT_MEETING.RESET_OUTCOME_CONTACT_MEETING,
        payload
      )
    );
    return response;
  }

  @Auth(true)
  @Get(API_ENDPOINTS.CONTACT.CONTACT_MEETING.CONTACT_MEETING_STATUS)
  @ApiOkResponse({ type: GetContactMeetingStatusResponseDto })
  public async getContactMeetingsStatus(
    @Param() param: ContactMeetingIdParamDto
  ): Promise<GetContactMeetingStatusResponseDto> {
    const response = await firstValueFrom(
      this.commonFeatureClient.send(
        RMQ_MESSAGES.CONTACT.CONTACT_MEETING.CONTACT_MEETING,
        param
      )
    );
    return response;
  }
}
