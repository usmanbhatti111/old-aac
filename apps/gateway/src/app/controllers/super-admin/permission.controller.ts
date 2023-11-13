import { Body, Controller, Get, Inject, Post, Query } from '@nestjs/common';
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
import { firstValueFrom } from 'rxjs';
import {
  AddCompanyAccountRoleDto,
  AddCompanyAccountRoleResponseDto,
  CompanyAccountRoleFilterDto,
  GetCompanyAccountRolesResponseDto,
} from '@shared/dto';

@ApiBearerAuth()
@ApiTags(API_TAGS.PERMISSIONS)
@Controller(CONTROLLERS.PERMISSIONS)
export class PermissionController {
  constructor(
    @Inject(SERVICES.SUPER_ADMIN)
    private superAdminService: ClientProxy
  ) {}

  @Post(API_ENDPOINTS.PERMISSION.ADD_ALL_PERMISSIONS)
  public async addAllPermissions(): Promise<any> {
    const response = await firstValueFrom(
      this.superAdminService.send(
        RMQ_MESSAGES.PERMISSION.ADD_ALL_PERMISSIONS,
        {}
      )
    );

    return response;
  }
  //
  //
  // todo need to add Auth guard
  //
  //

  @Post(API_ENDPOINTS.PERMISSION.ADD_COMPANY_ACCOUNT_ROLE)
  @ApiCreatedResponse({ type: AddCompanyAccountRoleResponseDto })
  public async addUserPermissions(
    @Body() payload: AddCompanyAccountRoleDto
    // @Req() req: AppRequest
  ) {
    const response = await firstValueFrom(
      this.superAdminService.send(
        RMQ_MESSAGES.PERMISSION.ADD_COMPNAY_ACCOUNT_ROLE,
        payload
      )
    );

    return response;
  }

  @Get(API_ENDPOINTS.PERMISSION.GET_COMPNAY_ACCOUNT_ROLES)
  @ApiOkResponse({ type: GetCompanyAccountRolesResponseDto })
  public async getPlans(
    @Query() payload: CompanyAccountRoleFilterDto
  ): Promise<GetCompanyAccountRolesResponseDto> {
    const response = await firstValueFrom(
      this.superAdminService.send(
        RMQ_MESSAGES.PERMISSION.GET_COMPNAY_ACCOUNT_ROLES,
        payload
      )
    );
    return response;
  }
}
