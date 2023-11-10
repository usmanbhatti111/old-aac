import { Controller, Get, Inject, Query, Req } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import {
  API_TAGS,
  CONTROLLERS,
  RMQ_MESSAGES,
  SERVICES,
} from '@shared/constants';
import {
  GetallActivitylogDTO,
  GetallActivitylogResponseDTO,
} from '@shared/dto';
import { firstValueFrom } from 'rxjs';
import { Auth } from '../../decorators/auth.decorator';
import { AppRequest } from '../../shared/interface/request.interface';

@ApiTags(API_TAGS.ACTIVITY_LOG)
@Controller(CONTROLLERS.ACTIVITY_LOG)
@ApiBearerAuth()
export class ActivitylogsController {
  constructor(
    @Inject(SERVICES.COMMON_FEATURE) private commonFeatureClient: ClientProxy
  ) {}

  @Get()
  @Auth(true)
  @ApiCreatedResponse({ type: GetallActivitylogResponseDTO })
  public async getallActivitylog(
    @Query() payload: GetallActivitylogDTO,
    @Req() request: AppRequest
  ) {
    const { user } = request;
    const response = await firstValueFrom(
      this.commonFeatureClient.send(
        { cmd: RMQ_MESSAGES.ACTIVITY_LOG.GET_ALL_ACTIVITIES },
        {
          ...payload,
          userId: user?._id,
          userRole: user?.role,
        }
      )
    );
    return response;
  }
}
