import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  API_ENDPOINTS,
  API_TAGS,
  CONTROLLERS,
  RMQ_MESSAGES,
  SERVICES,
} from '@shared/constants';
import { SignInDto, SignupDto, VerifyTokenDto } from '@shared/dto';
import { firstValueFrom } from 'rxjs';

@ApiTags(API_TAGS.AUTHENTICATION)
@Controller(CONTROLLERS.AUTHENTICATION)
@ApiBearerAuth()
export class AuthController {
  constructor(@Inject(SERVICES.USER) private userServiceClient: ClientProxy) {}

  @Post(API_ENDPOINTS.AUTHENTICATION.SIGNUP)
  public async createUser(@Body() payload: SignupDto) {
    const response = await firstValueFrom(
      this.userServiceClient.send(RMQ_MESSAGES.AUTHENTICATION.SIGNUP, payload)
    );

    return response;
  }

  @Post(API_ENDPOINTS.AUTHENTICATION.SIGNIN)
  public async signIn(@Body() payload: SignInDto) {
    const response = await firstValueFrom(
      this.userServiceClient.send(RMQ_MESSAGES.AUTHENTICATION.SIGNIN, payload)
    );

    return response;
  }

  @Post(API_ENDPOINTS.AUTHENTICATION.VERIFY_TOKEN)
  public async verifyToken(@Body() payload: VerifyTokenDto) {
    const response = await firstValueFrom(
      this.userServiceClient.send(
        RMQ_MESSAGES.AUTHENTICATION.VERIFY_TOKEN,
        payload
      )
    );

    return response;
  }
}
