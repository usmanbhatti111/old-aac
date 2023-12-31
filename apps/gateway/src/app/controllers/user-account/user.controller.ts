import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UploadedFile,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ApiFormData } from '@shared';
import {
  API_ENDPOINTS,
  API_TAGS,
  CONTROLLERS,
  EActivitylogModule,
  EActivitylogModuleName,
  EActivityType,
  RMQ_MESSAGES,
  SERVICES,
} from '@shared/constants';
import {
  GetAdminUserDto,
  CreateUserDto,
  UpdateProfileDto,
  GetAdminUserListResponseDto,
  AddAdminUserResponseDto,
  UserProfileResponseDto,
  UpdateAvatarDto,
  UpdateAvatarParamDto,
  UpdateAvatarQueryDto,
  UserAvatarResponseDto,
  CreateOrgUserDto,
  CreateOrgUserParamDto,
  IdParamDto,
  GetOrgEmployeesQueryDto,
  CreateOrgUserCompanyAccountDto,
  GetOrgEmployeeAccountsQueryDto,
  ActivityLogParams,
} from '@shared/dto';
import { firstValueFrom } from 'rxjs';
import { Auth } from '../../decorators/auth.decorator';
import { AppRequest } from '../../shared/interface/request.interface';

@ApiTags(API_TAGS.USER)
@Controller(CONTROLLERS.USER)
@ApiBearerAuth()
export class UserController {
  constructor(
    @Inject(SERVICES.USER) private userServiceClient: ClientProxy,
    @Inject(SERVICES.COMMON_FEATURE) private commonFeatureClient: ClientProxy
  ) {}

  @Auth(true)
  @Post(API_ENDPOINTS.USER.COMPANY_ACCOUNT)
  @ApiOperation({ summary: 'Add User for to company account' })
  @ApiOkResponse({ type: UserProfileResponseDto })
  public async createOrganizationUserCompanyAccount(
    @Param() { orgId }: CreateOrgUserParamDto,
    @Body() payload: CreateOrgUserCompanyAccountDto,
    @Req() request: AppRequest
  ): Promise<UserProfileResponseDto> {
    payload.organization = orgId;

    const response: any = firstValueFrom(
      this.userServiceClient.send(
        RMQ_MESSAGES.USER.CREATE_COMPANY_ACCOUNT,
        payload
      )
    );

    if (response?.data) {
      const params: ActivityLogParams = {
        performedBy: request?.user?._id, // userId
        activityType: EActivityType.CREATED, // UPDATED
        module: EActivitylogModule.ORG_USER_ACCOUNT, // module
        moduleId: response?.data?._id, // module._id
        moduleName: EActivitylogModuleName.ACCOUNT,
      };

      firstValueFrom(
        this.commonFeatureClient.emit(
          RMQ_MESSAGES.ACTIVITY_LOG.ACTIVITY_LOG,
          params
        )
      );
    }

    return response;
  }

  @Auth(true)
  @Get(API_ENDPOINTS.USER.COMPANY_ACCOUNT)
  @ApiOperation({ summary: 'Get Company account of user in that organization' })
  @ApiOkResponse({ type: UserProfileResponseDto })
  public getOrganizationUsersCompanyAccounts(
    @Param() { orgId }: CreateOrgUserParamDto,
    @Query() query: GetOrgEmployeeAccountsQueryDto
  ): Promise<UserProfileResponseDto> {
    query.organization = orgId;

    return firstValueFrom(
      this.userServiceClient.send(RMQ_MESSAGES.USER.GET_COMPANY_ACCOUNT, {
        ...query,
      })
    );
  }

  @Auth(true)
  @Post(API_ENDPOINTS.USER.CREATE)
  @ApiOperation({ summary: 'Create users as Super Admin' })
  @ApiCreatedResponse({ type: AddAdminUserResponseDto })
  public createUser(
    @Body() body: CreateUserDto,
    @Req() request: AppRequest
  ): Promise<AddAdminUserResponseDto> {
    const { user } = request;
    return firstValueFrom(
      this.userServiceClient.send(RMQ_MESSAGES.USER.CREATE, {
        ...body,
        createdBy: user._id,
      })
    );
  }

  @Auth(true)
  @Get(API_ENDPOINTS.USER.GET)
  @ApiOperation({ summary: 'List Admin User' })
  @ApiOkResponse({ type: GetAdminUserListResponseDto })
  public getUsers(
    @Query() query: GetAdminUserDto
  ): Promise<GetAdminUserListResponseDto> {
    return firstValueFrom(
      this.userServiceClient.send(RMQ_MESSAGES.USER.GET_LIST, query)
    );
  }

  @Auth(true)
  @Get(API_ENDPOINTS.USER.GET_ONE)
  @ApiOperation({ summary: 'User Profile' })
  @ApiOkResponse({ type: UserProfileResponseDto })
  public profile(@Param() { id }: IdParamDto): Promise<UserProfileResponseDto> {
    return firstValueFrom(
      this.userServiceClient.send(RMQ_MESSAGES.USER.PROFILE, { id })
    );
  }

  @Auth(true)
  @Patch(API_ENDPOINTS.USER.AVATAR)
  @ApiOperation({ summary: 'Update User Avatar' })
  @ApiOkResponse({ type: UserAvatarResponseDto })
  @ApiFormData({
    required: false,
    single: true,
    fieldName: 'avatar',
    fileTypes: ['jpg', 'png', 'jpeg'],
    errorMessage: 'Invalid document file entered.',
  })
  public updateAvatar(
    @Param() { id }: UpdateAvatarParamDto,
    @Query() { removeAvatar }: UpdateAvatarQueryDto,
    @Body() payload: UpdateAvatarDto,
    @UploadedFile() file: any
  ): Promise<UserProfileResponseDto> | any {
    payload.userId = id;
    payload.avatar = file;
    payload.removeAvatar = removeAvatar;

    return firstValueFrom(
      this.userServiceClient.send(RMQ_MESSAGES.USER.UPDATE_AVATAR, payload)
    );
  }

  @Auth(true)
  @Patch(API_ENDPOINTS.USER.UPDATE)
  @ApiOperation({ summary: 'Update Profile' })
  @ApiOkResponse({ type: UserProfileResponseDto })
  public updateProfile(
    @Param('id') userId: string,
    @Body() payload: UpdateProfileDto
  ): Promise<UserProfileResponseDto> {
    payload.userId = userId;

    return firstValueFrom(
      this.userServiceClient.send(RMQ_MESSAGES.USER.UPDATE_PROFILE, payload)
    );
  }

  @Auth(true)
  @Post(API_ENDPOINTS.USER.ORG_USER)
  @ApiOperation({ summary: 'Add User for organization' })
  @ApiOkResponse({ type: UserProfileResponseDto })
  public async createOrganizationUser(
    @Param() { orgId }: CreateOrgUserParamDto,
    @Body() payload: CreateOrgUserDto,
    @Req() request: AppRequest
  ): Promise<UserProfileResponseDto> {
    payload.organization = orgId;

    const response: any = await firstValueFrom(
      this.userServiceClient.send(RMQ_MESSAGES.USER.CREATE_ORG_USER, payload)
    );

    //ActivityLog
    if (response?.data) {
      const params: ActivityLogParams = {
        performedBy: request?.user?._id, // userId
        activityType: EActivityType.CREATED, // UPDATED
        module: EActivitylogModule.ORG_USER, // module
        moduleId: response?.data?._id, // module._id
        moduleName: EActivitylogModuleName.USER,
      };

      firstValueFrom(
        this.commonFeatureClient.emit(
          RMQ_MESSAGES.ACTIVITY_LOG.ACTIVITY_LOG,
          params
        )
      );
    }

    return response;
  }

  @Auth(true)
  @Get(API_ENDPOINTS.USER.ORG_USER)
  @ApiOperation({ summary: 'Get Users for organization' })
  @ApiOkResponse({ type: UserProfileResponseDto })
  public getOrganizationUsers(
    @Param() { orgId }: CreateOrgUserParamDto,
    @Query() query: GetOrgEmployeesQueryDto
  ): Promise<UserProfileResponseDto> {
    return firstValueFrom(
      this.userServiceClient.send(RMQ_MESSAGES.USER.GET_ORG_USERS, {
        ...query,
        orgId,
      })
    );
  }
}
