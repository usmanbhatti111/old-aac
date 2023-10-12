import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Post,
  Put,
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
import { firstValueFrom } from 'rxjs';

@ApiTags(API_TAGS.ROLE)
@Controller(CONTROLLERS.ROLE)
@ApiBearerAuth()
export class RoleController {
  constructor(@Inject(SERVICES.USER) private userServiceClient: ClientProxy) {}

  @Post(API_ENDPOINTS.ROLE.CREATE)
  public async createRole(@Body() payload: any) {
    const response = await firstValueFrom(
      this.userServiceClient.send(RMQ_MESSAGES.ROLE.CREATE_ROLE, payload)
    );

    return response;
  }

  @Put(API_ENDPOINTS.ROLE.UPDATE)
  public async updateRole(@Body() payload: any) {
    const response = await firstValueFrom(
      this.userServiceClient.send(RMQ_MESSAGES.ROLE.CREATE_ROLE, payload)
    );

    return response;
  }

  @Get(API_ENDPOINTS.ROLE.GET)
  public async getRoles(@Body() payload: any) {
    const response = await firstValueFrom(
      this.userServiceClient.send(RMQ_MESSAGES.ROLE.CREATE_ROLE, payload)
    );

    return response;
  }

  @Get(API_ENDPOINTS.ROLE.GET_ONE)
  public async getRole(@Body() payload: any) {
    const response = await firstValueFrom(
      this.userServiceClient.send(RMQ_MESSAGES.ROLE.CREATE_ROLE, payload)
    );

    return response;
  }

  @Delete(API_ENDPOINTS.ROLE.DELETE)
  public async deleteRole(@Body() payload: any) {
    const response = await firstValueFrom(
      this.userServiceClient.send(RMQ_MESSAGES.ROLE.CREATE_ROLE, payload)
    );

    return response;
  }
}
