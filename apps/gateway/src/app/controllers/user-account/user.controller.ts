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
  RMQ_MESSAGES,
  SERVICES,
} from '@shared/constants';
import {
  GetAdminUserDto,
  CreateUserDto,
  UpdateProfileDto,
  EditUserByAdminDto,
  GetAdminUserListResponseDto,
  AddAdminUserResponseDto,
  UserProfileResponseDto,
} from '@shared/dto';
import { firstValueFrom } from 'rxjs';
import { Auth } from '../../decorators/auth.decorator';
import { AppRequest } from '../../shared/interface/request.interface';

@ApiTags(API_TAGS.USER)
@Controller(CONTROLLERS.USER)
@ApiBearerAuth()
export class UserController {
  constructor(@Inject(SERVICES.USER) private userServiceClient: ClientProxy) {}

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
  public profile(@Param('id') userId: string): Promise<UserProfileResponseDto> {
    return firstValueFrom(
      this.userServiceClient.send(RMQ_MESSAGES.USER.PROFILE, userId)
    );
  }

  @Auth(true)
  @Patch(API_ENDPOINTS.USER.UPDATE)
  @ApiOperation({ summary: 'Update Profile' })
  @ApiOkResponse({ type: UserProfileResponseDto })
  @ApiFormData({
    required: false,
    single: true,
    fieldName: 'avatar',
    fileTypes: ['jpg', 'png', 'jpeg'],
    errorMessage: 'Invalid document file entered.',
  })
  public updateProfile(
    @Param('id') userId: string,
    @Body() payload: UpdateProfileDto,
    @UploadedFile() file: any
  ): Promise<UserProfileResponseDto> {
    payload.userId = userId;
    payload.avatar = file;

    return firstValueFrom(
      this.userServiceClient.send(RMQ_MESSAGES.USER.UPDATE_PROFILE, payload)
    );
  }

  @Auth(true)
  @Patch(API_ENDPOINTS.USER.EDIT_USER)
  @ApiOperation({ summary: 'Edit User by Admin' })
  @ApiOkResponse({ type: UserProfileResponseDto })
  public editUser(
    @Param('id') userId: string,
    @Query() query: EditUserByAdminDto
  ): Promise<UserProfileResponseDto> {
    query.userId = userId;
    return firstValueFrom(
      this.userServiceClient.send(RMQ_MESSAGES.USER.EDIT_USER, query)
    );
  }
}
