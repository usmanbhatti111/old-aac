import { Body, Controller, Get, Inject, Post, Query } from '@nestjs/common';
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
  CompanyHouseSearchQueryDto,
  SignInDto,
  SignupDto,
  VerifyTokenDto,
} from '@shared/dto';
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

  @Get(API_ENDPOINTS.AUTHENTICATION.SEARCH_ORG)
  public async searchCompany(@Query() payload: CompanyHouseSearchQueryDto) {
    let response: any;

    const { by, q } = payload;

    if (by == 'crn') {
      response = await firstValueFrom(
        this.userServiceClient.send(
          RMQ_MESSAGES.AUTHENTICATION.SEARCH_ORG_BY_CRN,
          { crn: Number(q) }
        )
      );
    } else {
      response = await firstValueFrom(
        this.userServiceClient.send(
          RMQ_MESSAGES.AUTHENTICATION.SEARCH_ORG_BY_NAME,
          { name: q }
        )
      );
    }

    return response;
  }
}
