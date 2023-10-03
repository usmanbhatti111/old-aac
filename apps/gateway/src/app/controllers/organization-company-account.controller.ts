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
import { ApiBearerAuth, ApiOkResponse, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import {
  API_ENDPOINTS,
  API_TAGS,
  CONTROLLERS,
  RMQ_MESSAGES,
  SERVICES,
} from '@shared/constants';
import {
  OrganizationCompanyAccountDto,
  OrganizationCompanyAccountResponseDto,
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
  public async createOrganizationAccount(
    @Body() payload: OrganizationCompanyAccountDto,
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
  @ApiParam({
    name: 'organization_id',
    type: String,
    description: 'Organization ID',
  })
  @ApiQuery({
    name: 'page',
    type: Number,
    description: 'Page number',
    required: false, 
  })
  @ApiQuery({
    name: 'limit',
    type: Number,
    description: 'Number of items per page',
    required: false, 
  })
  @ApiOkResponse({
    description: 'Successfully retrieved the organization company accounts',
    type: OrganizationCompanyAccountResponseDto,
  })
  public async getOrganizationAccount(
    @Param('organization_id') organization_id: string,
    @Query() query: GetOrganizationCompanyAccountDto,
    @Res() res: Response | any
  ) {
    console.log({ organization_id,...query });
    
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
