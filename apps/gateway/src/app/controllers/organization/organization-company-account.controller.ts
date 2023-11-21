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
  Req,
  Res,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
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
  GetOrganizationCompanyAccountDto,
  IdDto,
  UpdateOrganizationCompanyAccountDto,
  DeleteOrganizationCompanyAccountDto,
  DeleteOrganizationCompanyAccountResponseDto,
  UpdateOrganizationCompanyAccountStatusDto,
  DeleteMultipleOrganizationCompanyAccountDto,
} from '@shared/dto';
import { Response } from 'express';
import { firstValueFrom } from 'rxjs';
import { AppRequest } from '../../shared/interface/request.interface';
import { Auth } from '../../decorators/auth.decorator';

@ApiTags(API_TAGS.ORGANIZATION_COMPANY_ACCOUNT)
@Controller(CONTROLLERS.ORGANIZATION_COMPANY_ACCOUNT)
@ApiBearerAuth()
export class OrganizationCompanyAccountController {
  constructor(
    @Inject(SERVICES.ORG_ADMIN)
    private organizationAccountServiceClient: ClientProxy
  ) {}

  @Auth(true)
  @Get(
    API_ENDPOINTS.ORGANIZATION_COMPANY_ACCOUNT.GET_ORGANIZATION_COMPANY_ACCOUNTS
  )
  @ApiOkResponse({
    description: 'Successfully retrieved the organization company accounts',
    type: OrganizationCompanyAccountsResponseDto,
  })
  public async getOrganizationAccounts(
    @Req() request: AppRequest,
    @Param('organizationId') organizationId: string,
    @Query() query: GetOrganizationCompanyAccountDto,
    @Res() res: Response | any
  ): Promise<OrganizationCompanyAccountsResponseDto> {
    const response = await firstValueFrom(
      this.organizationAccountServiceClient.send(
        {
          cmd: RMQ_MESSAGES.ORGANIZATION_COMPANY_ACCOUNT
            .GET_ORGANIZATION_COMPANY_ACCOUNTS,
        },
        { organizationId, ...query }
      )
    );

    return res.status(response.statusCode).json(response);
  }

  @Auth(true)
  @Patch(
    API_ENDPOINTS.ORGANIZATION_COMPANY_ACCOUNT
      .UPDATE_ORGANIZATION_COMPANY_ACCOUNT_STATUS
  )
  @ApiOkResponse({ type: OrganizationCompanyAccountResponseDto })
  public async updateOrganizationAccountStatus(
    @Query() payload: UpdateOrganizationCompanyAccountStatusDto,
    @Req() request: AppRequest
  ): Promise<OrganizationCompanyAccountResponseDto> {
    payload.updatedBy = request?.user?._id;

    const response = await firstValueFrom(
      this.organizationAccountServiceClient.send(
        {
          cmd: RMQ_MESSAGES.ORGANIZATION_COMPANY_ACCOUNT
            .UPDATE_ORGANIZATION_COMPANY_ACCOUNT_STATUS,
        },
        payload
      )
    );

    return response;
  }

  @Auth(true)
  @Post(
    API_ENDPOINTS.ORGANIZATION_COMPANY_ACCOUNT
      .CREATE_ORGANIZATION_COMPANY_ACCOUNT
  )
  @ApiCreatedResponse({
    description: "Successfully created an organization's company accounts",
    type: OrganizationCompanyAccountResponseDto,
  })
  public async createOrganizationAccount(
    @Req() request: AppRequest,
    @Body() payload: CreateOrganizationCompanyAccountDto,
    @Res() res: Response | any
  ): Promise<OrganizationCompanyAccountResponseDto> {
    payload.createdBy = request?.user?._id;
    const response = await firstValueFrom(
      this.organizationAccountServiceClient.send(
        {
          cmd: RMQ_MESSAGES.ORGANIZATION_COMPANY_ACCOUNT
            .CREATE_ORGANIZATION_COMPANY_ACCOUNT,
        },
        payload
      )
    );

    return res.status(response.statusCode).json(response);
  }

  @Auth(true)
  @Patch(
    API_ENDPOINTS.ORGANIZATION_COMPANY_ACCOUNT
      .UPDATE_ORGANIZATION_COMPANY_ACCOUNT
  )
  @ApiCreatedResponse({
    description: "Successfully updated an organization's company accounts",
    type: OrganizationCompanyAccountResponseDto,
  })
  public async updateOrganizationAccount(
    @Req() request: AppRequest,
    @Param() params: IdDto,
    @Body() payload: UpdateOrganizationCompanyAccountDto,
    @Res() res: Response | any
  ): Promise<OrganizationCompanyAccountResponseDto> {
    payload.updatedBy = request?.user?._id;
    payload.id = params.id;

    const response = await firstValueFrom(
      this.organizationAccountServiceClient.send(
        {
          cmd: RMQ_MESSAGES.ORGANIZATION_COMPANY_ACCOUNT
            .UPDATE_ORGANIZATION_COMPANY_ACCOUNT,
        },
        payload
      )
    );
    return res.status(response.statusCode).json(response);
  }

  @Auth(true)
  @Delete(
    API_ENDPOINTS.ORGANIZATION_COMPANY_ACCOUNT
      .DELETE_MULTIPLE_ORGANIZATION_COMPANY_ACCOUNT
  )
  @ApiOkResponse({ type: DeleteOrganizationCompanyAccountResponseDto })
  public async deleteMultipleOrganizationAccount(
    @Req() request: AppRequest,
    @Body() payload: DeleteMultipleOrganizationCompanyAccountDto
  ): Promise<DeleteOrganizationCompanyAccountResponseDto> {
    payload.deletedBy = request?.user?._id;

    const response = await firstValueFrom(
      this.organizationAccountServiceClient.send(
        {
          cmd: RMQ_MESSAGES.ORGANIZATION_COMPANY_ACCOUNT
            .DELETE_MULTIPLE_ORGANIZATION_COMPANY_ACCOUNT,
        },
        payload
      )
    );

    return response;
  }

  @Auth(true)
  @Delete(
    API_ENDPOINTS.ORGANIZATION_COMPANY_ACCOUNT
      .DELETE_ORGANIZATION_COMPANY_ACCOUNT
  )
  @ApiOkResponse({ type: DeleteOrganizationCompanyAccountResponseDto })
  public async deleteOrganizationAccount(
    @Req() request: AppRequest,
    @Param() payload: DeleteOrganizationCompanyAccountDto
  ): Promise<DeleteOrganizationCompanyAccountResponseDto> {
    payload.deletedBy = request?.user?._id;

    const response = await firstValueFrom(
      this.organizationAccountServiceClient.send(
        {
          cmd: RMQ_MESSAGES.ORGANIZATION_COMPANY_ACCOUNT
            .DELETE_ORGANIZATION_COMPANY_ACCOUNT,
        },
        payload
      )
    );

    return response;
  }

  @Auth(true)
  @Get(
    API_ENDPOINTS.ORGANIZATION_COMPANY_ACCOUNT.GET_ORGANIZATION_COMPANY_ACCOUNT
  )
  @ApiOkResponse({
    description: 'Successfully retrieved the organization company account',
    type: OrganizationCompanyAccountResponseDto,
  })
  public async getOrganizationAccount(
    @Param() payload: IdDto,
    @Res() res: Response | any
  ): Promise<OrganizationCompanyAccountResponseDto> {
    const response = await firstValueFrom(
      this.organizationAccountServiceClient.send(
        {
          cmd: RMQ_MESSAGES.ORGANIZATION_COMPANY_ACCOUNT
            .GET_ORGANIZATION_COMPANY_ACCOUNT,
        },
        payload
      )
    );

    return res.status(response.statusCode).json(response);
  }
}
