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
  ContactFilterDto,
  ContactIdParamDto,
  CreateContactDto,
  CreateContactNoteDto,
  CreateContactResponseDto,
  EditContactDto,
  EditContactResponseDto,
  GetContactResponseDto,
  GetContactsResponseDto,
  PostResponseDto,
} from '@shared/dto';
import { firstValueFrom } from 'rxjs';
import { Auth } from '../../decorators/auth.decorator';
import { AppRequest } from '../../shared/interface/request.interface';
import { AssignContactOwnerDto } from '../../../../../../libs/shared/src/dto';

@ApiTags(API_TAGS.CONTACT)
@Controller(CONTROLLERS.CONTACT)
@ApiBearerAuth()
export class ContactController {
  constructor(
    @Inject(SERVICES.COMMON_FEATURE) private commonFeatureClient: ClientProxy
  ) {}

  @Auth(true)
  @Post(API_ENDPOINTS.CONTACT.CREATE_CONTACT)
  @ApiCreatedResponse({ type: CreateContactResponseDto })
  public async createContact(
    @Body() payload: CreateContactDto,
    @Req() req: AppRequest
  ) {
    payload.createdBy = req.user._id;
    const response = await firstValueFrom(
      this.commonFeatureClient.send(
        RMQ_MESSAGES.CONTACT.CREATE_CONTACT,
        payload
      )
    );
    return response;
  }

  @Auth(true)
  @Post(API_ENDPOINTS.CONTACT.CREATE_CONTACT_NOTE)
  @ApiCreatedResponse({ type: CreateContactResponseDto })
  public async createContactNote(
    @Body() payload: CreateContactNoteDto,
    @Req() req: AppRequest
  ): Promise<CreateContactResponseDto> {
    payload.updatedBy = req.user._id;
    const response = await firstValueFrom(
      this.commonFeatureClient.send(
        RMQ_MESSAGES.CONTACT.CREATE_CONTACT_NOTE,
        payload
      )
    );
    return response;
  }

  @Auth(true)
  @Get(API_ENDPOINTS.CONTACT.CONTACT_LIST)
  @ApiOkResponse({ type: GetContactsResponseDto })
  public async getContacts(
    @Query() payload: ContactFilterDto
  ): Promise<GetContactsResponseDto> {
    const response = await firstValueFrom(
      this.commonFeatureClient.send(RMQ_MESSAGES.CONTACT.CONTACT_LIST, payload)
    );
    return response;
  }

  @Auth(true)
  @Get(API_ENDPOINTS.CONTACT.CONTACT)
  @ApiOkResponse({ type: GetContactResponseDto })
  public async getContact(
    @Param() { contactId }: ContactIdParamDto
  ): Promise<GetContactResponseDto> {
    const response = await firstValueFrom(
      this.commonFeatureClient.send(RMQ_MESSAGES.CONTACT.CONTACT, contactId)
    );
    return response;
  }

  @Auth(true)
  @Delete(API_ENDPOINTS.CONTACT.DELETE_CONTACT)
  @ApiOkResponse({ type: PostResponseDto })
  public async deleteContact(
    @Param() { contactId }: ContactIdParamDto,
    @Req() req: AppRequest
  ): Promise<PostResponseDto<any>> {
    const deletedBy = req.user._id;
    const response = await firstValueFrom(
      this.commonFeatureClient.send(RMQ_MESSAGES.CONTACT.DELETE_CONTACT, {
        contactId,
        deletedBy,
      })
    );
    return response;
  }

  @Auth(true)
  @Patch(API_ENDPOINTS.CONTACT.EDIT_CONTACT)
  @ApiCreatedResponse({ type: EditContactResponseDto })
  public async updateContact(
    @Param() { contactId }: ContactIdParamDto,
    @Body() payload: EditContactDto,
    @Req() req: AppRequest
  ): Promise<EditContactResponseDto> {
    payload.contactId = contactId;
    payload.updatedBy = req.user._id;
    const response = await firstValueFrom(
      this.commonFeatureClient.send(RMQ_MESSAGES.CONTACT.EDIT_CONTACT, payload)
    );
    return response;
  }

  @Auth(true)
  @Patch(API_ENDPOINTS.CONTACT.ASSIGN_CONTACT_OWNER)
  @ApiCreatedResponse({ type: EditContactResponseDto })
  public async assignContactOwner(
    @Param() { contactId }: ContactIdParamDto,
    @Body() payload: AssignContactOwnerDto,
    @Req() req: AppRequest
  ): Promise<EditContactResponseDto> {
    payload.contactId = contactId;
    payload.updatedBy = req.user._id;
    const response = await firstValueFrom(
      this.commonFeatureClient.send(
        RMQ_MESSAGES.CONTACT.ASSIGN_CONTACT_OWNER,
        payload
      )
    );
    return response;
  }
}
