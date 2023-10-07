import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
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

  @Get(API_ENDPOINTS.AIR_SERVICES.TASK.GET_TASK)
  @ApiQuery({
    name: 'ticketId',
    type: String,
  })
  async getTasks(
    @Query('ticketId') ticketId: string,
    @Res() res: Response | any
  ) {
    try {
      const response = await firstValueFrom(
        this.airServiceClient.send(
          RMQ_MESSAGES.AIR_SERVICES.TASK.GET_TASKS,
          ticketId
        )
      );

      return res.status(response.statusCode).json(response);
    } catch (err) {
      return res.status(err.statusCode).json(err);
    }
  }
}
