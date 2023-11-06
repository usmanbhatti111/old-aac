import {
  Body,
  Controller,
  Inject,
  Post,
  Res,
  Put,
  Get,
  Param,
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
  CreateOrganizationDto,
  GetOrganizationDto,
  IdDto,
  OrganizationResponseDto,
  OrganizationsResponseDto,
} from '@shared/dto';
import { Response } from 'express';
import { firstValueFrom } from 'rxjs';
import { Auth } from '../../decorators/auth.decorator';

@ApiTags(API_TAGS.ORGANIZATION)
@Controller(CONTROLLERS.ORGANIZATION)
@ApiBearerAuth()
export class OrganizationController {
  constructor(
    @Inject(SERVICES.ORG_ADMIN) private organizationServiceClient: ClientProxy
  ) {}

  @Auth(true)
  @Post(API_ENDPOINTS.ORGANIZATION.CREATE_ORGANIZATION)
  @ApiCreatedResponse({
    description: 'Successfully created an organization',
    type: OrganizationResponseDto,
  })
  public async createOrganization(
    @Body() payload: CreateOrganizationDto,
    @Res() res: Response | any
  ): Promise<OrganizationResponseDto> {
    const response = await firstValueFrom(
      this.organizationServiceClient.send(
        { cmd: RMQ_MESSAGES.ORGANIZATION.CREATE_ORGANTIZATION },
        payload
      )
    );

    return res.status(response.statusCode).json(response);
  }

  @Auth(true)
  @Put(API_ENDPOINTS.ORGANIZATION.UPDATE_ORGANIZATION)
  @ApiOkResponse({
    description: 'Successfully updated the organization.',
    type: OrganizationResponseDto,
  })
  public async updateOrganization(
    @Param() params: IdDto,
    @Body() payload: CreateOrganizationDto,
    @Res() res: Response | any
  ): Promise<OrganizationResponseDto> {
    const response = await firstValueFrom(
      this.organizationServiceClient.send(
        { cmd: RMQ_MESSAGES.ORGANIZATION.UPDATE_ORGANTIZATION },
        { ...params, ...payload }
      )
    );

    return res.status(response.statusCode).json(response);
  }

  @Auth(true)
  @Get(API_ENDPOINTS.ORGANIZATION.GET_ORGANIZATIONS)
  @ApiOkResponse({
    description: 'Successfully retrieved the organizations.',
    type: OrganizationsResponseDto,
  })
  public async getOrganizations(
    @Res() res: Response | any
  ): Promise<OrganizationsResponseDto> {
    const response = await firstValueFrom(
      this.organizationServiceClient.send(
        { cmd: RMQ_MESSAGES.ORGANIZATION.GET_ORGANTIZATIONS },
        {}
      )
    );

    return res.status(response.statusCode).json(response);
  }

  @Auth(true)
  @Get(API_ENDPOINTS.ORGANIZATION.GET_ORGANIZATION)
  @ApiOkResponse({
    description: 'Successfully retrieved the organization.',
    type: OrganizationResponseDto,
  })
  public async getOrganization(
    @Param() payload: GetOrganizationDto,
    @Res() res: Response | any
  ): Promise<OrganizationResponseDto> {
    const response = await firstValueFrom(
      this.organizationServiceClient.send(
        { cmd: RMQ_MESSAGES.ORGANIZATION.GET_ORGANTIZATION },
        payload
      )
    );

    return res.status(response.statusCode).json(response);
  }
}
