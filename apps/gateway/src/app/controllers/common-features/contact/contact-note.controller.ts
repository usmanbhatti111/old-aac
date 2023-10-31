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
  UploadedFile,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  ApiBearerAuth,
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
  ContactNoteFilterDto,
  ContactNoteIdParamDto,
  CreateContactNoteDto,
  CreateContactNoteResponseDto,
  EditContactNoteDto,
  EditContactNoteResponseDto,
  GetContactNoteResponseDto,
  GetContactNotesResponseDto,
  PostResponseDto,
} from '@shared/dto';
import { firstValueFrom } from 'rxjs';
import { Auth } from '../../../decorators/auth.decorator';
import { AppRequest } from '../../../shared/interface/request.interface';
import { ApiFormData } from '@shared';

@ApiTags(API_TAGS.CONTACT_NOTE)
@Controller(CONTROLLERS.CONTACT_NOTE)
@ApiBearerAuth()
export class ContactNoteController {
  constructor(
    @Inject(SERVICES.COMMON_FEATURE) private commonFeatureClient: ClientProxy
  ) {}

  @Auth(true)
  @Post(API_ENDPOINTS.CONTACT.CONTACT_NOTE.CREATE_CONTACT_NOTE)
  @ApiFormData({
    required: false,
    single: true,
    fieldName: 'attachment',
    fileTypes: ['jpg', 'png'],
    errorMessage: 'Invalid document file entered.',
  })
  @ApiCreatedResponse({ type: CreateContactNoteResponseDto })
  public async createContactNote(
    @Body() payload: CreateContactNoteDto,
    @Req() req: AppRequest,
    @UploadedFile() attachment: any
  ): Promise<CreateContactNoteResponseDto> {
    payload.updatedBy = req.user._id;
    const response = await firstValueFrom(
      this.commonFeatureClient.send(
        RMQ_MESSAGES.CONTACT.CONTACT_NOTE.CREATE_CONTACT_NOTE,
        { ...payload, attachment }
      )
    );
    return response;
  }

  @Auth(true)
  @Get(API_ENDPOINTS.CONTACT.CONTACT_NOTE.CONTACT_NOTE_LIST)
  @ApiOkResponse({ type: GetContactNotesResponseDto })
  public async getContactNotes(
    @Query() payload: ContactNoteFilterDto
  ): Promise<GetContactNotesResponseDto> {
    const response = await firstValueFrom(
      this.commonFeatureClient.send(
        RMQ_MESSAGES.CONTACT.CONTACT_NOTE.CONTACT_NOTE_LIST,
        payload
      )
    );
    return response;
  }

  @Auth(true)
  @Get(API_ENDPOINTS.CONTACT.CONTACT_NOTE.CONTACT_NOTE)
  @ApiOkResponse({ type: GetContactNoteResponseDto })
  public async getContactNote(
    @Param() param: ContactNoteIdParamDto
  ): Promise<GetContactNoteResponseDto> {
    const response = await firstValueFrom(
      this.commonFeatureClient.send(
        RMQ_MESSAGES.CONTACT.CONTACT_NOTE.CONTACT_NOTE,
        param
      )
    );
    return response;
  }

  @Auth(true)
  @Delete(API_ENDPOINTS.CONTACT.CONTACT_NOTE.DELETE_CONTACT_NOTE)
  @ApiOkResponse({ type: PostResponseDto })
  public async deleteContactNote(
    @Param() { contactNoteId }: ContactNoteIdParamDto,
    @Req() req: AppRequest
  ): Promise<PostResponseDto<any>> {
    const deletedBy = req.user._id;
    const response = await firstValueFrom(
      this.commonFeatureClient.send(
        RMQ_MESSAGES.CONTACT.CONTACT_NOTE.DELETE_CONTACT_NOTE,
        {
          contactNoteId,
          deletedBy,
        }
      )
    );
    return response;
  }

  @Auth(true)
  @Patch(API_ENDPOINTS.CONTACT.CONTACT_NOTE.EDIT_CONTACT_NOTE)
  @ApiCreatedResponse({ type: EditContactNoteResponseDto })
  public async updateContactNote(
    @Param() { contactNoteId }: ContactNoteIdParamDto,
    @Body() payload: EditContactNoteDto,
    @Req() req: AppRequest
  ): Promise<EditContactNoteResponseDto> {
    payload.contactNoteId = contactNoteId;
    payload.updatedBy = req.user._id;
    const response = await firstValueFrom(
      this.commonFeatureClient.send(
        RMQ_MESSAGES.CONTACT.CONTACT_NOTE.EDIT_CONTACT_NOTE,
        payload
      )
    );
    return response;
  }
}
