import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import {
  API_ENDPOINTS,
  API_TAGS,
  CONTROLLERS,
  RMQ_MESSAGES,
  SERVICES,
} from '@shared/constants';
import {
  CreateOrganizationCompanyAccountDto,
  OrganizationCompanyAccountResponseDto,
  OrganizationCompanyAccountsResponseDto,
  GetOrganizationCompanyAccountDto
} from '@shared/dto';
import { Response } from 'express';
import { firstValueFrom } from 'rxjs';

@ApiTags(API_TAGS.ORGANIZATION_COMPANY_ACCOUNT)
@Controller(CONTROLLERS.ORGANIZATION_COMPANY_ACCOUNT)
@ApiBearerAuth()
export class OrganizationCompanyAccountController {
  constructor(
    @Inject(SERVICES.ORG_ADMIN) private organizationServiceClient: ClientProxy
  ) {}

  @Post(
    API_ENDPOINTS.ORGANIZATION_COMPANY_ACCOUNT
      .CREATE_ORGANIZATION_COMPANY_ACCOUNT
  )
  @ApiCreatedResponse({
    description: 'Successfully created an organization\'s company accounts',
    type: OrganizationCompanyAccountResponseDto,
  })
  public async createOrganizationAccount(
    @Body() payload: CreateOrganizationCompanyAccountDto,
    @Res() res: Response | any
  ) {
    const response = await firstValueFrom(
      this.organizationServiceClient.send(
        {
          cmd: RMQ_MESSAGES.ORGANIZATION_COMPANY_ACCOUNT
            .CREATE_ORGANIZATION_COMPANY_ACCOUNT,
        },
        payload
      )
    );

    return res.status(response.statusCode).json(response);
  }

  @Get(
    API_ENDPOINTS.ORGANIZATION_COMPANY_ACCOUNT
      .GET_ORGANIZATION_COMPANY_ACCOUNTS
  )
  @ApiOkResponse({
    description: 'Successfully retrieved the organization company accounts',
    type: OrganizationCompanyAccountsResponseDto,
  })
  public async getOrganizationAccount(
    @Param('organization_id') organization_id: string,
    @Query() query: GetOrganizationCompanyAccountDto,
    @Res() res: Response | any
  ) {
    const response = await firstValueFrom(
      this.organizationServiceClient.send(
        {
          cmd: RMQ_MESSAGES.ORGANIZATION_COMPANY_ACCOUNT
            .GET_ORGANIZATION_COMPANY_ACCOUNTS,
        },
        { organization_id,...query }
      )
    );

    return res.status(response.statusCode).json(response);
  }
}
