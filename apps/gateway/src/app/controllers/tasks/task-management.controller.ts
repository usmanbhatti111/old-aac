import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  API_ENDPOINTS,
  API_TAGS,
  CONTROLLERS,
  RMQ_MESSAGES,
  SERVICES,
} from '@shared/constants';
import {
  AddTaskManagementDto,
  EditTaskManagementDto,
  GetTaskActivitytDto,
  GetTaskManagementDto,
} from '@shared/dto';
import { firstValueFrom } from 'rxjs';
import { Auth } from '../../decorators/auth.decorator';
import { AppRequest } from '../../shared/interface/request.interface';

@ApiTags(API_TAGS.TASK_MANAGEMENT)
@Controller(CONTROLLERS.TASK_MANAGEMENT)
@ApiBearerAuth()
export class TaskManagementController {
  constructor(
    @Inject(SERVICES.AIR_SERVICES) private airServiceClient: ClientProxy
  ) {}

  @Auth(true)
  @Post(API_ENDPOINTS.AIR_SERVICES.TASK_MANAGEMENT.CREATE_TASK)
  addTask(@Req() req: AppRequest, @Body() dto: AddTaskManagementDto) {
    dto.createdById = req?.user?._id;
    return firstValueFrom(
      this.airServiceClient.send(
        RMQ_MESSAGES.AIR_SERVICES.TASK_MANAGEMENT.CREATE_TASK,
        dto
      )
    );
  }

  @Auth(true)
  @Get(API_ENDPOINTS.AIR_SERVICES.TASK_MANAGEMENT.TASK_LIST)
  getTasks(@Query() query: GetTaskManagementDto) {
    return firstValueFrom(
      this.airServiceClient.send(
        RMQ_MESSAGES.AIR_SERVICES.TASK_MANAGEMENT.TASK_LIST,
        query
      )
    );
  }

  @Get(API_ENDPOINTS.AIR_SERVICES.TASK_MANAGEMENT.TASK_DETAIL)
  taskDetail(@Param('id') id: string) {
    return firstValueFrom(
      this.airServiceClient.send(
        RMQ_MESSAGES.AIR_SERVICES.TASK_MANAGEMENT.TASK_DETAIL,
        id
      )
    );
  }

  @Auth(true)
  @Patch(API_ENDPOINTS.AIR_SERVICES.TASK_MANAGEMENT.UPDATE_TASK)
  updateTask(
    @Req() req: AppRequest,
    @Param('id') id: string,
    @Body() updateTaskDto: EditTaskManagementDto
  ) {
    updateTaskDto.updatedById = req?.user?._id;
    return firstValueFrom(
      this.airServiceClient.send(
        RMQ_MESSAGES.AIR_SERVICES.TASK_MANAGEMENT.EDIT_TASK,
        {
          id,
          updateTaskDto,
        }
      )
    );
  }

  @Auth(true)
  @Delete(API_ENDPOINTS.AIR_SERVICES.TASK_MANAGEMENT.DELETE_TASK)
  deleteTask(@Req() req: AppRequest, @Query('ids') ids: string[]) {
    return firstValueFrom(
      this.airServiceClient.send(
        RMQ_MESSAGES.AIR_SERVICES.TASK_MANAGEMENT.DELETE_TASK,
        {
          ids,
          deletedById: req?.user?._id,
        }
      )
    );
  }

  @Get(API_ENDPOINTS.AIR_SERVICES.TASK_MANAGEMENT.TASK_ACTIVITY_LIST)
  getTasksActivities(@Query() query: GetTaskActivitytDto) {
    return firstValueFrom(
      this.airServiceClient.send(
        RMQ_MESSAGES.AIR_SERVICES.TASK_MANAGEMENT.TASK_ACTIVITY_LIST,
        { query }
      )
    );
  }
}
