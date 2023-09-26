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
import { SignupDto } from '@shared/dto';
import { Response } from 'express';
import { firstValueFrom } from 'rxjs';

@ApiTags(API_TAGS.AUTHENTICATION)
@Controller(CONTROLLERS.AUTHENTICATION)
@ApiBearerAuth()
export class AuthController {
  constructor(
    @Inject(SERVICES.USER_SERVICE) private userServiceClient: ClientProxy
  ) {}

  @Post(API_ENDPOINTS.AUTHENTICATION.SIGNUP)
  public async createUser(@Body() payload: SignupDto, @Res() res: Response | any) {
    const response = await firstValueFrom(
      this.userServiceClient.send(RMQ_MESSAGES.AUTHENTICATION.SIGNUP, payload)
    );

    return res.status(response.statusCode).json(response);
  }
}
