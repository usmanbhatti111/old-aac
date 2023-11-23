import { Body, Controller, Get, Inject, Post, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  API_ENDPOINTS,
  API_TAGS,
  CONTROLLERS,
  RMQ_MESSAGES,
  SERVICES,
  UserRole,
} from '@shared/constants';
import {
  CompanyHouseSearchQueryDto,
  ForceConfirmDto,
  InitiateVerificationRequestDto,
  InitiateVerificationResponseDto,
  SignInDto,
  SignupDto,
  VerifyTokenDto,
  WebhookRequestDto,
} from '@shared/dto';
import { firstValueFrom } from 'rxjs';

@ApiTags(API_TAGS.AUTHENTICATION)
@Controller(CONTROLLERS.AUTHENTICATION)
@ApiBearerAuth()
export class AuthController {
  constructor(
    @Inject(SERVICES.USER) private userServiceClient: ClientProxy,
    @Inject(SERVICES.SUPER_ADMIN) private superAdminClient: ClientProxy
  ) {}

  @Post(API_ENDPOINTS.AUTHENTICATION.FORCE_CONFIRM)
  public async forceConfirmUser(@Body() payload: ForceConfirmDto) {
    const response = await firstValueFrom(
      this.userServiceClient.send(
        RMQ_MESSAGES.AUTHENTICATION.FORCE_CONFIRM,
        payload
      )
    );

    return response;
  }

  @Post(API_ENDPOINTS.AUTHENTICATION.SIGNUP)
  public async createUser(@Body() payload: SignupDto) {
    try {
      const { role } = payload;
      // let newOrg: any;

      if (role === UserRole.ORG_ADMIN) {
        await firstValueFrom(
          this.userServiceClient.send(
            RMQ_MESSAGES.AUTHENTICATION.SEARCH_ORG_BY_CRN,
            { crn: payload.crn }
          )
        );
        const { products } = payload;

        if (products.length > 0) {
          for (const item of products) {
            await firstValueFrom(
              this.superAdminClient.send(RMQ_MESSAGES.PRODUCTS.GET_PRODUCT, {
                id: item,
              })
            );
          }
        }
      }

      const response = await firstValueFrom(
        this.userServiceClient.send(RMQ_MESSAGES.AUTHENTICATION.SIGNUP, payload)
      );

      return response;
    } catch (err) {
      throw new RpcException(err);
    }
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

  @Post(API_ENDPOINTS.AUTHENTICATION.IG_VERIFICATION)
  @ApiOperation({ summary: 'Initiate IdentityGram Verification Session' })
  @ApiCreatedResponse({
    type: InitiateVerificationResponseDto,
  })
  public async initiateVerification(
    @Body() payload: InitiateVerificationRequestDto
  ) {
    const response = await firstValueFrom(
      this.userServiceClient.send(RMQ_MESSAGES.AUTHENTICATION.IG_VERIFICATION, {
        ...payload,
      })
    );

    return response;
  }

  @Post(API_ENDPOINTS.AUTHENTICATION.IG_STATUS_UPDATE)
  @ApiOperation({ summary: 'Webhook: IdentityGram Verification Status Update' })
  public async updateIgVerificationStatus(@Body() payload: WebhookRequestDto) {
    const response = await firstValueFrom(
      this.userServiceClient.send(
        RMQ_MESSAGES.AUTHENTICATION.IG_STATUS_UPDATE,
        { ...payload }
      )
    );

    return response;
  }
}
