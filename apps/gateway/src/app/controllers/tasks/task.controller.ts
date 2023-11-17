import {
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
  Req,
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
import { AddTaskDto, GetTaskListDto, IdDto, UpdateTaskDto } from '@shared/dto';
import { Response } from 'express';
import { firstValueFrom } from 'rxjs';
import { AppRequest } from '../../shared/interface/request.interface';
import { Auth } from '../../decorators/auth.decorator';

@ApiTags(API_TAGS.TASK)
@Controller(CONTROLLERS.TASK)
@ApiBearerAuth()
export class TaskController {
  constructor(
    @Inject(SERVICES.AIR_SERVICES) private airServiceClient: ClientProxy
  ) {}

  @Auth(true)
  @Post(API_ENDPOINTS.AIR_SERVICES.TASK.ADD_TASK)
  public async addTask(
    @Query() dto: AddTaskDto,
    @Res() res: Response | any,
    @Req() req: AppRequest
  ) {
    try {
      dto.createdBy = req?.user?._id;
      const response = await firstValueFrom(
        this.airServiceClient.send(RMQ_MESSAGES.AIR_SERVICES.TASK.ADD_TASK, dto)
      );

      return res.status(response.statusCode).json(response);
    } catch (error) {
      return res.status(error.statusCode).json(error);
    }
  }

  @Auth(true)
  @Get(API_ENDPOINTS.AIR_SERVICES.TASK.GET_TASK)
  @ApiQuery({
    name: 'ticketId',
    type: String,
  })
  async getTasks(@Query() payload: GetTaskListDto, @Res() res: Response | any) {
    try {
      const response = await firstValueFrom(
        this.airServiceClient.send(
          RMQ_MESSAGES.AIR_SERVICES.TASK.GET_TASKS,
          payload
        )
      );

      return res.status(response.statusCode).json(response);
    } catch (err) {
      return res.status(err.statusCode).json(err);
    }
  }

  @Auth(true)
  @Patch(API_ENDPOINTS.AIR_SERVICES.TASK.UPDATE_TASK)
  async updateTask(
    @Param() { id }: IdDto,
    @Query() updateTaskDto: UpdateTaskDto,
    @Res() res: Response | any
  ) {
    try {
      const response = await firstValueFrom(
        this.airServiceClient.send(RMQ_MESSAGES.AIR_SERVICES.TASK.UPDATE_TASK, {
          id,
          updateTaskDto,
        })
      );
      return res.status(response.statusCode).json(response);
    } catch (error) {
      return res.status(error.statusCode).json(error);
    }
  }

  @Auth(true)
  @Delete(API_ENDPOINTS.AIR_SERVICES.TASK.DELETE_TASK_DATA)
  async deleteTaskData(
    @Query('ids') ids: string[],
    @Res() res: Response | any
  ) {
    try {
      const response = await firstValueFrom(
        this.airServiceClient.send(
          RMQ_MESSAGES.AIR_SERVICES.TASK.DELETE_TASK_DATA,
          { ids }
        )
      );
      return res.status(response.statusCode).json(response);
    } catch (err) {
      return res.status(err.statusCode).json(err);
    }
  }
}
