import { Controller, Get, Inject, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  API_ENDPOINTS,
  API_TAGS,
  CONTROLLERS,
  RMQ_MESSAGES,
  SERVICES,
} from '@shared/constants';
import { WorkLoadFilterDto } from '@shared/dto';
import { firstValueFrom } from 'rxjs';
import { Auth } from '../../decorators/auth.decorator';

@ApiTags(API_TAGS.WORK_LOAD_MANAGEMENT)
@Controller(CONTROLLERS.WORK_LOAD_MANAGEMENT)
@ApiBearerAuth()
export class WorkloadManagementController {
  constructor(
    @Inject(SERVICES.AIR_SERVICES) private airServiceClient: ClientProxy
  ) {}

  @Auth(true)
  @Get(API_ENDPOINTS.AIR_SERVICES.WORK_LOAD_MANAGEMENT.WORK_LOAD_LIST)
  getWorkLoad(@Query() query: WorkLoadFilterDto) {
    return firstValueFrom(
      this.airServiceClient.send(
        RMQ_MESSAGES.AIR_SERVICES.WORK_LOAD_MANAGEMENT.WORK_LOAD_LIST,
        { query }
      )
    );
  }
}
