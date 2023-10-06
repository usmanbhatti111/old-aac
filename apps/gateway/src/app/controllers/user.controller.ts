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
import { AddUserDto } from '@shared/dto';
import { Response } from 'express';
import { firstValueFrom } from 'rxjs';

@ApiTags(API_TAGS.TASK)
@Controller(CONTROLLERS.TASK)
@ApiBearerAuth()
export class UserController {
  constructor(@Inject(SERVICES.USER) private userServiceClient: ClientProxy) {}

  @Post(API_ENDPOINTS.AIR_SERVICES.TASK.ADD_TASK)
  public async createUser(@Body() dto: AddUserDto, @Res() res: Response | any) {
    const response = await firstValueFrom(
      this.userServiceClient.send(RMQ_MESSAGES.AIR_SERVICES.TASK.ADD_TASK, {
        ...dto,
      })
    );

    return res.status(response.statusCode).json(response);
  }
}
