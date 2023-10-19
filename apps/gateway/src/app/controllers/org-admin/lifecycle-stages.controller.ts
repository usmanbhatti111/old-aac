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
  AddLifecycleStageDto,
  AddLifecycleStageResponseDto,
  DeleteLifecycleStageDto,
  DeleteLifecycleStageResponseDto,
  EditLifecycleStageDto,
  EditLifecycleStageResponseDto,
  GetLifecycleStageResponseDto,
  GetLifecycleStagesDto,
  GetLifecycleStagesResponseDto,
  IdDto,
} from '@shared/dto';
import { firstValueFrom } from 'rxjs';
import { Auth } from '../../decorators/auth.decorator';
import { AppRequest } from '../../shared/interface/request.interface';

@ApiBearerAuth()
@ApiTags(API_TAGS.LIFECYCLE_STAGES)
@Controller(CONTROLLERS.LIFECYCLE_STAGES)
export class LifecycleStagesController {
  constructor(
    @Inject(SERVICES.ORG_ADMIN) private orgAdminServiceClient: ClientProxy
  ) {}

  @Auth(true)
  @Post(API_ENDPOINTS.ORG_ADMIN.LIFECYCLE_STAGES.ADD_LIFECYCLE_STAGE)
  @ApiCreatedResponse({ type: AddLifecycleStageResponseDto })
  public async addContactStatus(
    @Req() request: AppRequest,
    @Body() payload: AddLifecycleStageDto
  ): Promise<AddLifecycleStageResponseDto> {
    payload.createdBy = request?.user?._id;

    const response = await firstValueFrom(
      this.orgAdminServiceClient.send(
        RMQ_MESSAGES.ORG_ADMIN.LIFECYCLE_STAGES.ADD_LIFECYCLE_STAGE,
        payload
      )
    );

    return response;
  }

  @Auth(true)
  @Get(API_ENDPOINTS.ORG_ADMIN.LIFECYCLE_STAGES.GET_LIFECYCLE_STAGES)
  @ApiOkResponse({ type: GetLifecycleStagesResponseDto })
  public async getProductsFeatures(
    @Req() request: AppRequest,
    @Query() payload: GetLifecycleStagesDto
  ): Promise<GetLifecycleStagesResponseDto> {
    payload.userId = request?.user?._id; // get contact statuses related to specific organization

    const response = await firstValueFrom(
      this.orgAdminServiceClient.send(
        RMQ_MESSAGES.ORG_ADMIN.LIFECYCLE_STAGES.GET_LIFECYCLE_STAGES,
        payload
      )
    );

    return response;
  }

  @Get(API_ENDPOINTS.ORG_ADMIN.LIFECYCLE_STAGES.GET_LIFECYCLE_STAGE)
  @ApiOkResponse({ type: GetLifecycleStageResponseDto })
  public async getNewsOrEvent(
    @Param() payload: IdDto
  ): Promise<GetLifecycleStageResponseDto> {
    const response = await firstValueFrom(
      this.orgAdminServiceClient.send(
        RMQ_MESSAGES.ORG_ADMIN.LIFECYCLE_STAGES.GET_LIFECYCLE_STAGE,
        payload
      )
    );

    return response;
  }

  @Auth(true)
  @Patch(API_ENDPOINTS.ORG_ADMIN.LIFECYCLE_STAGES.EDIT_LIFECYCLE_STAGE)
  @ApiOkResponse({ type: EditLifecycleStageResponseDto })
  public async editContactStatus(
    @Req() request: AppRequest,
    @Param() params: IdDto,
    @Body() payload: EditLifecycleStageDto
  ): Promise<EditLifecycleStageResponseDto> {
    payload.updatedBy = request?.user?._id;
    payload.id = params.id;

    const response = await firstValueFrom(
      this.orgAdminServiceClient.send(
        RMQ_MESSAGES.ORG_ADMIN.LIFECYCLE_STAGES.EDIT_LIFECYCLE_STAGE,
        payload
      )
    );

    return response;
  }

  @Auth(true)
  @Delete(API_ENDPOINTS.ORG_ADMIN.LIFECYCLE_STAGES.DELETE_LIFECYCLE_STAGE)
  @ApiOkResponse({ type: DeleteLifecycleStageResponseDto })
  public async deleteNewsAndEvents(
    @Req() request: AppRequest,
    @Param() payload: DeleteLifecycleStageDto
  ): Promise<DeleteLifecycleStageResponseDto> {
    payload.deletedBy = request?.user?._id;

    const response = await firstValueFrom(
      this.orgAdminServiceClient.send(
        RMQ_MESSAGES.ORG_ADMIN.LIFECYCLE_STAGES.DELETE_LIFECYCLE_STAGE,
        payload
      )
    );

    return response;
  }
}
