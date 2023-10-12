import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Query,
  Req,
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
import { CreateUserDto } from '@shared/dto';
import { firstValueFrom } from 'rxjs';
import { Auth } from '../../decorators/auth.decorator';
import { AppRequest } from '../../shared/interface/request.interface';

@ApiTags(API_TAGS.USER)
@Controller(CONTROLLERS.USER)
@ApiBearerAuth()
export class UserController {
  constructor(@Inject(SERVICES.USER) private userServiceClient: ClientProxy) {}

  @Auth(true)
  @Post(API_ENDPOINTS.USER.CREATE)
  @ApiQuery({ description: 'Create users as Super Admin' })
  public async createUser(
    @Body() body: CreateUserDto,
    @Req() request: AppRequest
  ) {
    const { user } = request;

    const response = await firstValueFrom(
      this.userServiceClient.send(RMQ_MESSAGES.USER.CREATE, {
        ...body,
        createdBy: user._id,
      })
    );

    return response;
  }

  @Auth(true)
  @Get('')
  @ApiQuery({ name: 'email', type: String })
  public async createRole(
    @Query('email') email: string,
    @Req() request: AppRequest
  ) {
    const { user } = request;

    const response = await firstValueFrom(
      this.userServiceClient.send(RMQ_MESSAGES.USER.FIND_BY_EMAIL, {
        email,
        user,
      })
    );

    return response;
  }
}
