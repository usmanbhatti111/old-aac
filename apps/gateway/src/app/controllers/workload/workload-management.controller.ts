import { Controller, Get, Inject, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
  API_ENDPOINTS,
  API_TAGS,
  CONTROLLERS,
  RMQ_MESSAGES,
  SERVICES,
} from '@shared/constants';

import {
  GetUsersListResponseDto,
  UserTasksDto,
  WorkLoadFilterDto,
} from '@shared/dto';
import { firstValueFrom } from 'rxjs';
import { Auth } from '../../decorators/auth.decorator';

@ApiTags(API_TAGS.WORK_LOAD_MANAGEMENT)
@Controller(CONTROLLERS.WORK_LOAD_MANAGEMENT)
@ApiBearerAuth()
export class WorkloadManagementController {
  constructor(
    @Inject(SERVICES.AIR_SERVICES) private airServiceClient: ClientProxy
  ) {}

  @Get(API_ENDPOINTS.AIR_SERVICES.WORK_LOAD_MANAGEMENT.WORK_LOAD_LIST)
  getWorkLoad(@Query() query: WorkLoadFilterDto) {
    return firstValueFrom(
      this.airServiceClient.send(
        RMQ_MESSAGES.AIR_SERVICES.WORK_LOAD_MANAGEMENT.WORK_LOAD_LIST,
        { query }
      )
    );
  }

  @Auth(true)
  @ApiOkResponse({ type: GetUsersListResponseDto })
  @Get(API_ENDPOINTS.AIR_SERVICES.WORK_LOAD_MANAGEMENT.GET_USER_TASKS)
  async getUsersTasks(
    @Query('userIds') userIds: UserTasksDto
  ): Promise<GetUsersListResponseDto> {
    try {
      const response = await firstValueFrom(
        this.airServiceClient.send(
          RMQ_MESSAGES.AIR_SERVICES.WORK_LOAD_MANAGEMENT.GET_USER_TASKS,
          userIds
        )
      );

      return response;
    } catch (err) {
      throw new RpcException(err);
    }
  }
}
