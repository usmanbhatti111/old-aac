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
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import {
  API_ENDPOINTS,
  API_TAGS,
  CONTROLLERS,
  CompanyAccountRoleStatusEnum,
  RMQ_MESSAGES,
  SERVICES,
} from '@shared/constants';
import { firstValueFrom } from 'rxjs';
import {
  AddCompanyAccountRoleDto,
  AddCompanyAccountRoleResponseDto,
  CompanyAccountRoleFilterDto,
  EditCompanyAccountRoleDto,
  GetCompanyAccountRolesResponseDto,
} from '@shared/dto';
import { Auth } from '../../decorators/auth.decorator';

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

  @Auth(true)
  @Post(API_ENDPOINTS.PERMISSION.ADD_COMPANY_ACCOUNT_ROLE)
  @ApiCreatedResponse({ type: AddCompanyAccountRoleResponseDto })
  public async addUserPermissions(@Body() payload: AddCompanyAccountRoleDto) {
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
  public async getCompanyAccountRoles(
    @Query() payload: CompanyAccountRoleFilterDto
  ) {
    const response = await firstValueFrom(
      this.superAdminService.send(
        RMQ_MESSAGES.PERMISSION.GET_COMPNAY_ACCOUNT_ROLES,
        payload
      )
    );
    return response;
  }

  @Auth(true)
  @Patch(API_ENDPOINTS.PERMISSION.UPDATE_COMPANY_ACCOUNT_ROLE)
  @ApiOkResponse({ type: AddCompanyAccountRoleResponseDto })
  @ApiParam({
    type: String,
    name: 'id',
    example: '654dcb1717626bdc860bda38',
    description: 'compnay account role id',
  })
  @ApiQuery({
    name: 'status',
    enum: CompanyAccountRoleStatusEnum,
    example: CompanyAccountRoleStatusEnum.ACTIVE,
    required: false,
  })
  public async updateCompanyAccountRole(
    @Body() payload: EditCompanyAccountRoleDto,
    @Param('id') id: string,
    @Query('status') status: string
  ) {
    payload.companyAccountRoleId = id;
    if (status) {
      payload.status = status;
    }
    const response = await firstValueFrom(
      this.superAdminService.send(
        RMQ_MESSAGES.PERMISSION.EDIT_COMPANY_ACCOUNT_ROLE,
        payload
      )
    );

    return response;
  }
}
