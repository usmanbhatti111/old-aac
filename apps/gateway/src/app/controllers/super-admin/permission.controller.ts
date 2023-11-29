import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
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
import { firstValueFrom } from 'rxjs';
import {
  AddCompanyAccountRoleDto,
  AddCompanyAccountRoleResponseDto,
  EditCompanyAccountRoleDto,
  GetCompanyAccountRolesDto,
  GetCompanyAccountRolesResponseDto,
  GetProductPermissionsResponseDto,
  IdDto,
  PlanProductParamDto,
} from '@shared/dto';
import { Auth } from '../../decorators/auth.decorator';

@ApiBearerAuth()
@ApiTags(API_TAGS.PERMISSIONS)
@Controller(CONTROLLERS.PERMISSIONS)
export class PermissionController {
  constructor(
    @Inject(SERVICES.SUPER_ADMIN)
    private superAdminService: ClientProxy
  ) { }

  @Auth(true)
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

  @Auth(true)
  @Get(API_ENDPOINTS.PERMISSION.GET_PERMISSIONS_BY_PRODUCT)
  @ApiOkResponse({ type: GetProductPermissionsResponseDto })
  public async getPermissionsByProduct(@Param() payload: PlanProductParamDto): Promise<GetProductPermissionsResponseDto> {
    const response = await firstValueFrom(
      this.superAdminService.send(
        RMQ_MESSAGES.PERMISSION.GET_PERMISSIONS_BY_PRODUCT,
        payload
      )
    );
    return response;
  }

  @Auth(true)
  @Post(API_ENDPOINTS.PERMISSION.ADD_COMPANY_ACCOUNT_ROLE)
  @ApiCreatedResponse({ type: AddCompanyAccountRoleResponseDto })
  public async addUserPermissions(
    @Body() payload: AddCompanyAccountRoleDto
  ): Promise<AddCompanyAccountRoleResponseDto> {
    const response = await firstValueFrom(
      this.superAdminService.send(
        RMQ_MESSAGES.PERMISSION.ADD_COMPNAY_ACCOUNT_ROLE,
        payload
      )
    );

    return response;
  }

  // @Auth(true)
  @Get(API_ENDPOINTS.PERMISSION.GET_COMPNAY_ACCOUNT_ROLES)
  @ApiOkResponse({ type: GetCompanyAccountRolesResponseDto })
  public async getCompanyAccountRoles(
    @Query() payload: GetCompanyAccountRolesDto
  ): Promise<GetCompanyAccountRolesResponseDto> {
    const response = await firstValueFrom(
      this.superAdminService.send(
        RMQ_MESSAGES.PERMISSION.GET_COMPNAY_ACCOUNT_ROLES,
        payload
      )
    );
    return response;
  }

  // @Auth(true)
  @Patch(API_ENDPOINTS.PERMISSION.UPDATE_COMPANY_ACCOUNT_ROLE)
  @ApiOkResponse({ type: AddCompanyAccountRoleResponseDto })
  public async updateCompanyAccountRole(
    @Body() payload: EditCompanyAccountRoleDto,
    @Param() { id }: IdDto
  ): Promise<AddCompanyAccountRoleResponseDto> {
    payload.companyAccountRoleId = id;
    const response = await firstValueFrom(
      this.superAdminService.send(
        RMQ_MESSAGES.PERMISSION.EDIT_COMPANY_ACCOUNT_ROLE,
        payload
      )
    );

    return response;
  }
}
