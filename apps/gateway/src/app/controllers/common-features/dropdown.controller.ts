import { Controller, Get, Inject, Param, Query, Req } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import {
  API_ENDPOINTS,
  API_TAGS,
  CONTROLLERS,
  RMQ_MESSAGES,
  SERVICES,
} from '@shared/constants';

import { firstValueFrom } from 'rxjs';
import { AppRequest } from '../../shared/interface/request.interface';
import {
  CommonIdParamDto,
  GetAllDropdownResponseDto,
  GetAllSearchDTO,
} from '@shared/dto';
import { Auth } from '../../decorators/auth.decorator';

@ApiTags(API_TAGS.DROPDOWNS)
@Controller(CONTROLLERS.DROPDOWN)
@ApiBearerAuth()
export class DropdownController {
  constructor(
    @Inject(SERVICES.COMMON_FEATURE) private commonFeatureClient: ClientProxy,
    @Inject(SERVICES.USER) private userClient: ClientProxy,
    @Inject(SERVICES.ORG_ADMIN) private orgAdminClient: ClientProxy
  ) {}

  @Get(API_ENDPOINTS.DROPDOWNS.ORGANIZATION_DROPDOWN)
  @ApiCreatedResponse({ type: GetAllDropdownResponseDto })
  public async getallOrganizations(
    @Query() search: GetAllSearchDTO,
    @Req() request: AppRequest
  ): Promise<GetAllDropdownResponseDto> {
    const { user } = request;
    const response = await firstValueFrom(
      this.commonFeatureClient.send(
        { cmd: RMQ_MESSAGES.DROPDOWNS.ORGANIZATIONS_DROPDOWN },
        { search: search?.search, userId: user?._id }
      )
    );
    return response;
  }

  @Get(API_ENDPOINTS.DROPDOWNS.PRODUCTS_DROPDOWN)
  @ApiCreatedResponse({ type: GetAllDropdownResponseDto })
  public async getallProducts(
    @Query() search: GetAllSearchDTO,
    @Req() request: AppRequest
  ): Promise<GetAllDropdownResponseDto> {
    const { user } = request;
    const response = await firstValueFrom(
      this.commonFeatureClient.send(
        { cmd: RMQ_MESSAGES.DROPDOWNS.PRODUCTS_DROPDOWN },
        { search: search?.search, userId: user?._id }
      )
    );
    return response;
  }

  @Auth(true)
  @Get(API_ENDPOINTS.DROPDOWNS.ORG_EMPLOYEES)
  @ApiCreatedResponse({ type: GetAllDropdownResponseDto })
  public async getOrgUsers(
    @Param() { id }: CommonIdParamDto,
    @Query() { search = '' }: GetAllSearchDTO
  ): Promise<GetAllDropdownResponseDto> {
    const response = await firstValueFrom(
      this.userClient.send(RMQ_MESSAGES.DROPDOWNS.ORG_EMPLOYEES, {
        search,
        organization: id,
      })
    );
    return response;
  }

  @Auth(true)
  @Get(API_ENDPOINTS.DROPDOWNS.ORG_COMPANIES)
  @ApiCreatedResponse({ type: GetAllDropdownResponseDto })
  public async getOrgCompanies(
    @Param() { id }: CommonIdParamDto,
    @Query() query: GetAllSearchDTO
  ): Promise<GetAllDropdownResponseDto> {
    const response = await firstValueFrom(
      this.orgAdminClient.send(RMQ_MESSAGES.DROPDOWNS.ORG_COMPANIES, {
        ...query,
        organization: id,
      })
    );
    return response;
  }
}
