import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { RMQ_MESSAGES } from '@shared/constants';
import { ActivitylogsService } from '../services/activitylogs.service';
import { ActivityLogParams, GetallActivitylogDTO } from '@shared/dto';

@Controller()
export class ActivitylogsController {
  constructor(private readonly activitylogService: ActivitylogsService) {}

  @EventPattern(RMQ_MESSAGES.ACTIVITY_LOG.ACTIVITY_LOG)
  async activityLog(@Payload() payload: ActivityLogParams) {
    return this.activitylogService.activityLog(payload);
  }

  @MessagePattern({ cmd: RMQ_MESSAGES.ACTIVITY_LOG.GET_ALL_ACTIVITIES })
  async getallActivities(@Payload() payload: GetallActivitylogDTO) {
    return this.activitylogService.getallActivities(payload);
  }
}
