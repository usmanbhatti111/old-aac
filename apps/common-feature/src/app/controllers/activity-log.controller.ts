import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { ICreateActivityLog } from '@shared';
import { RMQ_MESSAGES } from '@shared/constants';
import { GetActivityLogDto } from '@shared/dto';
import { ActivityLogService } from '../services/activityLog.service';
@Controller()
export class ActivityLogController {
  constructor(private attachmentService: ActivityLogService) {}

  @EventPattern(RMQ_MESSAGES.ACTIVITY_LOGS.CREATE_ACTIVITY_LOG)
  public async createActivityLog(@Payload() payload: ICreateActivityLog) {
    return this.attachmentService.createActivityLog(payload);
  }

  @MessagePattern(RMQ_MESSAGES.ACTIVITY_LOGS.GET_ACTIVITY_LOG)
  public async getActivityLog(@Payload() payload: GetActivityLogDto) {
    return this.attachmentService.getActivityLog(payload);
  }
}
