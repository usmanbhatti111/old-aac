import { Body, Controller, Inject, Post, Res } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  API_ENDPOINTS,
  API_TAGS,
  CONTROLLERS,
  RMQ_MESSAGES,
  SERVICES,
} from '@shared/constants';
import { AddTaskDto } from '@shared/dto';
import { Response } from 'express';
import { firstValueFrom } from 'rxjs';

@ApiTags(API_TAGS.TASK)
@Controller(CONTROLLERS.TASK)
@ApiBearerAuth()
export class TaskController {
  constructor(
    @Inject(SERVICES.AIR_SERVICES) private airServiceClient: ClientProxy
  ) {}

  @Post(API_ENDPOINTS.AIR_SERVICES.TASK.ADD_TASK)
  public async addTask(@Body() dto: AddTaskDto, @Res() res: Response | any) {
    try {
      const response = await firstValueFrom(
        this.airServiceClient.send(RMQ_MESSAGES.AIR_SERVICES.TASK.ADD_TASK, dto)
      );

      return res.status(response.statusCode).json(response);
    } catch (error) {
      return res.status(error.statusCode).json(error);
    }
  }
}
