import { Controller, Get, Inject, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import {
  API_ENDPOINTS,
  API_TAGS,
  CONTROLLERS,
  RMQ_MESSAGES,
  SERVICES,
} from '@shared/constants';
import { GetActivityLogDto } from '@shared/dto';
import { firstValueFrom } from 'rxjs';

@ApiTags(API_TAGS.ACTIVITY_LOGS)
@Controller(CONTROLLERS.ACTIVITY_LOGS)
export class ActivityLogController {
  constructor(
    @Inject(SERVICES.COMMON_FEATURE) private ariServiceClient: ClientProxy
  ) {}

  @Get(API_ENDPOINTS.ACTIVITY_LOGS.GET_ACTIVITY_LOG)
  public async getActivityLog(
    @Query() queryParams: GetActivityLogDto
  ): Promise<any> {
    try {
      return await firstValueFrom(
        this.ariServiceClient.send(
          RMQ_MESSAGES.ACTIVITY_LOGS.GET_ACTIVITY_LOG,
          queryParams
        )
      );
    } catch (err) {
      throw new RpcException(err);
    }
  }
}
