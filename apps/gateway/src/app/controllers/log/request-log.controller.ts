import { Controller, Inject, Res, Get, Param } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
  API_ENDPOINTS,
  API_TAGS,
  CONTROLLERS,
  RMQ_MESSAGES,
  SERVICES,
} from '@shared/constants';
import { RequestLogsResponseDto, IdDTO } from '@shared/dto';
import { Response } from 'express';
import { firstValueFrom } from 'rxjs';

@ApiTags(API_TAGS.LOGS)
@Controller(CONTROLLERS.LOGS)
@ApiBearerAuth()
export class RequestLogController {
  constructor(@Inject(SERVICES.USER) private userServiceClient: ClientProxy) {}

  @Get(API_ENDPOINTS.LOGS.GET_LOGS)
  @ApiOkResponse({
    description: 'Successfully retrieved all request logs.',
    type: RequestLogsResponseDto,
  })
  public async getRequestLogs(
    @Res() res: Response | any
  ): Promise<RequestLogsResponseDto> {
    const response = await firstValueFrom(
      this.userServiceClient.send({ cmd: RMQ_MESSAGES.LOGS.GET_LOGS }, {})
    );

    return res.status(response.statusCode).json(response);
  }
  @Get(API_ENDPOINTS.LOGS.GET_LOGS_BY_USER)
  @ApiOkResponse({
    description: 'Successfully retrieved user request logs.',
    type: RequestLogsResponseDto,
  })
  public async getRequestLogsByUser(
    @Param() payload: IdDTO,
    @Res() res: Response | any
  ): Promise<RequestLogsResponseDto> {
    const response = await firstValueFrom(
      this.userServiceClient.send(
        { cmd: RMQ_MESSAGES.LOGS.GET_LOGS_BY_USER },
        { ...payload }
      )
    );

    return res.status(response.statusCode).json(response);
  }
}
