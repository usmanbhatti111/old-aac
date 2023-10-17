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
  GetTaskManagementDto,
} from '@shared/dto';
import { firstValueFrom } from 'rxjs';

@ApiTags(API_TAGS.TASK_MANAGEMENT)
@Controller(CONTROLLERS.TASK_MANAGEMENT)
@ApiBearerAuth()
export class TaskManagementController {
  constructor(
    @Inject(SERVICES.AIR_SERVICES) private airServiceClient: ClientProxy
  ) {}

  @Post(API_ENDPOINTS.AIR_SERVICES.TASK_MANAGEMENT.CREATE_TASK)
  addTask(@Body() dto: AddTaskManagementDto) {
    return firstValueFrom(
      this.airServiceClient.send(
        RMQ_MESSAGES.AIR_SERVICES.TASK_MANAGEMENT.CREATE_TASK,
        dto
      )
    );
  }

  @Get(API_ENDPOINTS.AIR_SERVICES.TASK_MANAGEMENT.TASK_LIST)
  getTasks(@Query() query: GetTaskManagementDto) {
    return firstValueFrom(
      this.airServiceClient.send(
        RMQ_MESSAGES.AIR_SERVICES.TASK_MANAGEMENT.TASK_LIST,
        { query }
      )
    );
  }

  @Get(API_ENDPOINTS.AIR_SERVICES.TASK_MANAGEMENT.TASK_DETAIL)
  taskDetail(@Param('id') id: string) {
    return firstValueFrom(
      this.airServiceClient.send(
        RMQ_MESSAGES.AIR_SERVICES.TASK_MANAGEMENT.TASK_DETAIL,
        {
          id,
        }
      )
    );
  }

  @Patch(API_ENDPOINTS.AIR_SERVICES.TASK_MANAGEMENT.UPDATE_TASK)
  updateTask(
    @Param('id') id: string,
    @Body() updateTaskDto: EditTaskManagementDto
  ) {
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

  @Delete(API_ENDPOINTS.AIR_SERVICES.TASK_MANAGEMENT.DELETE_TASK)
  deleteTask(@Query('ids') ids: string[]) {
    return firstValueFrom(
      this.airServiceClient.send(
        RMQ_MESSAGES.AIR_SERVICES.TASK_MANAGEMENT.DELETE_TASK,
        {
          ids,
        }
      )
    );
  }
}
