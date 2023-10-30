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
  ContactAssociationResponse,
  ContactDeletedFilterDto,
  ContactFilterDto,
  ContactIdParamDto,
  CreateContactDto,
  CreateContactResponseDto,
  EditContactDto,
  EditContactResponseDto,
  GetContactAssociatinsDto,
  GetContactResponseDto,
  GetContactsResponseDto,
  PostResponseDto,
  GetDeletedContactsResponseDto,
  ContactNoteFilterDto,
  GetContactTasksResponseDto,
} from '@shared/dto';
import { firstValueFrom } from 'rxjs';
import { Auth } from '../../../decorators/auth.decorator';
import { AppRequest } from '../../../shared/interface/request.interface';
import { AssignContactOwnerDto } from '../../../../../../../libs/shared/src/dto';
import { ApiFormData } from '@shared';

@ApiTags(API_TAGS.CONTACT)
@Controller(CONTROLLERS.CONTACT)
@ApiBearerAuth()
export class ContactController {
  constructor(
    @Inject(SERVICES.COMMON_FEATURE) private commonFeatureClient: ClientProxy
  ) {}
  @Post()
  @Auth(true)
  @Post(API_ENDPOINTS.CONTACT.CREATE_CONTACT)
  @ApiFormData({
    required: false,
    single: true,
    fieldName: 'file',
    fileTypes: ['jpg', 'png'],
    errorMessage: 'Invalid document file entered.',
  })
  @ApiCreatedResponse({ type: CreateContactResponseDto })
  public async createContact(
    @Body() payload: CreateContactDto,
    @Req() req: AppRequest,
    @UploadedFile() profilePicture: any
  ) {
    payload.createdBy = req.user._id;
    const response = await firstValueFrom(
      this.commonFeatureClient.send(RMQ_MESSAGES.CONTACT.CREATE_CONTACT, {
        ...payload,
        profilePicture,
      })
    );
    return response;
  }

  @Auth(true)
  @Get(API_ENDPOINTS.CONTACT.CONTACT_TASKS)
  @ApiOkResponse({ type: GetContactTasksResponseDto })
  public async getContactNotes(
    @Query() payload: ContactNoteFilterDto
  ): Promise<GetContactTasksResponseDto> {
    const response = await firstValueFrom(
      this.commonFeatureClient.send(RMQ_MESSAGES.CONTACT.CONTACT_TASKS, payload)
    );
    return response;
  }

  @Auth(true)
  @Delete(API_ENDPOINTS.CONTACT.RESTORE_CONTACT)
  @ApiOkResponse({ type: PostResponseDto })
  public async restoreContact(
    @Param() { contactId }: ContactIdParamDto,
    @Req() req: AppRequest
  ): Promise<PostResponseDto<any>> {
    const deletedBy = req.user._id;
    const response = await firstValueFrom(
      this.commonFeatureClient.send(RMQ_MESSAGES.CONTACT.RESTORE_CONTACT, {
        contactId,
        deletedBy,
      })
    );
    return response;
  }

  @Auth(true)
  @Get(API_ENDPOINTS.CONTACT.CONTACT_DELETED_LIST)
  @ApiOkResponse({ type: GetDeletedContactsResponseDto })
  public async getDeletedContacts(
    @Query() payload: ContactDeletedFilterDto
  ): Promise<GetDeletedContactsResponseDto> {
    const response = await firstValueFrom(
      this.commonFeatureClient.send(
        RMQ_MESSAGES.CONTACT.CONTACT_DELETED_LIST,
        payload
      )
    );
    return response;
  }

  @Auth(true)
  @Get(API_ENDPOINTS.CONTACT.CONTACT_ASSOCIATIONS)
  @ApiOkResponse({ type: ContactAssociationResponse })
  public async getContactAssociations(
    @Query() payload: GetContactAssociatinsDto
  ): Promise<ContactAssociationResponse> {
    const response = await firstValueFrom(
      this.commonFeatureClient.send(
        RMQ_MESSAGES.CONTACT.CONTACT_ASSOCIATIONS,
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
    @Param() parma: ContactIdParamDto
  ): Promise<GetContactResponseDto> {
    const response = await firstValueFrom(
      this.commonFeatureClient.send(RMQ_MESSAGES.CONTACT.CONTACT, parma)
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
