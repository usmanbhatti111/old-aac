import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RMQ_MESSAGES } from '@shared/constants';
import { RequestLogService } from '../services/request-log.service';
import { CreateRequestLogDto, IdDTO } from '@shared/dto';

@Controller()
export class RequestLogController {
  constructor(private readonly requestLogService: RequestLogService) {}

  @MessagePattern({ cmd: RMQ_MESSAGES.LOGS.CREATE })
  createNewRequestLog(@Payload() payload: CreateRequestLogDto) {
    return this.requestLogService.createRequestLog(payload);
  }

  @MessagePattern({ cmd: RMQ_MESSAGES.LOGS.GET_LOGS })
  getRequestLog() {
    return this.requestLogService.getRequestLogs();
  }

  @MessagePattern({ cmd: RMQ_MESSAGES.LOGS.GET_LOGS_BY_USER })
  getRequestLogsByUser(@Payload() payload: IdDTO) {
    return this.requestLogService.getRequestLogsByUser(payload);
  }
}
