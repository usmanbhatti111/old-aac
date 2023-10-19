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
  AddContactStatusDto,
  AddContactStatusResponseDto,
  DeleteContactStatusDto,
  DeleteContactStatusResponseDto,
  EditContactStatusDto,
  EditContactStatusResponseDto,
  GetContactStatusResponseDto,
  GetContactStatusesDto,
  GetContactStatusesResponseDto,
  IdDto,
} from '@shared/dto';
import { firstValueFrom } from 'rxjs';
import { Auth } from '../../decorators/auth.decorator';
import { AppRequest } from '../../shared/interface/request.interface';

@ApiBearerAuth()
@ApiTags(API_TAGS.CONTACT_STATUS)
@Controller(CONTROLLERS.CONTACT_STATUS)
export class ContactStatusController {
  constructor(
    @Inject(SERVICES.ORG_ADMIN) private orgAdminServiceClient: ClientProxy
  ) {}

  @Auth(true)
  @Post(API_ENDPOINTS.ORG_ADMIN.CONTACT_STATUS.ADD_CONTACT_STATUS)
  @ApiCreatedResponse({ type: AddContactStatusResponseDto })
  public async addContactStatus(
    @Req() request: AppRequest,
    @Body() payload: AddContactStatusDto
  ): Promise<AddContactStatusResponseDto> {
    payload.createdBy = request?.user?._id;

    const response = await firstValueFrom(
      this.orgAdminServiceClient.send(
        RMQ_MESSAGES.ORG_ADMIN.CONTACT_STATUS.ADD_CONTACT_STATUS,
        payload
      )
    );

    return response;
  }

  @Auth(true)
  @Get(API_ENDPOINTS.ORG_ADMIN.CONTACT_STATUS.GET_CONTACT_STATUSES)
  @ApiOkResponse({ type: GetContactStatusesResponseDto })
  public async getProductsFeatures(
    @Req() request: AppRequest,
    @Query() payload: GetContactStatusesDto
  ): Promise<GetContactStatusesResponseDto> {
    payload.userId = request?.user?._id; // get contact statuses related to specific organization

    const response = await firstValueFrom(
      this.orgAdminServiceClient.send(
        RMQ_MESSAGES.ORG_ADMIN.CONTACT_STATUS.GET_CONTACT_STATUSES,
        payload
      )
    );

    return response;
  }

  @Get(API_ENDPOINTS.ORG_ADMIN.CONTACT_STATUS.GET_CONTACT_STATUS)
  @ApiOkResponse({ type: GetContactStatusResponseDto })
  public async getNewsOrEvent(
    @Param() payload: IdDto
  ): Promise<GetContactStatusResponseDto> {
    const response = await firstValueFrom(
      this.orgAdminServiceClient.send(
        RMQ_MESSAGES.ORG_ADMIN.CONTACT_STATUS.GET_CONTACT_STATUS,
        payload
      )
    );

    return response;
  }

  @Auth(true)
  @Patch(API_ENDPOINTS.ORG_ADMIN.CONTACT_STATUS.EDIT_CONTACT_STATUS)
  @ApiOkResponse({ type: EditContactStatusResponseDto })
  public async editContactStatus(
    @Req() request: AppRequest,
    @Param() params: IdDto,
    @Body() payload: EditContactStatusDto
  ): Promise<EditContactStatusResponseDto> {
    payload.updatedBy = request?.user?._id;
    payload.id = params.id;

    const response = await firstValueFrom(
      this.orgAdminServiceClient.send(
        RMQ_MESSAGES.ORG_ADMIN.CONTACT_STATUS.EDIT_CONTACT_STATUS,
        payload
      )
    );

    return response;
  }

  @Auth(true)
  @Delete(API_ENDPOINTS.ORG_ADMIN.CONTACT_STATUS.DELETE_CONTACT_STATUS)
  @ApiOkResponse({ type: DeleteContactStatusResponseDto })
  public async deleteNewsAndEvents(
    @Req() request: AppRequest,
    @Param() payload: DeleteContactStatusDto
  ): Promise<DeleteContactStatusResponseDto> {
    payload.deletedBy = request?.user?._id;

    const response = await firstValueFrom(
      this.orgAdminServiceClient.send(
        RMQ_MESSAGES.ORG_ADMIN.CONTACT_STATUS.DELETE_CONTACT_STATUS,
        payload
      )
    );

    return response;
  }
}
