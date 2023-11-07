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
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
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
  public createUser(@Body() body: CreateUserDto, @Req() request: AppRequest) {
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
  public getUsers(@Query() query: GetAdminUserDto) {
    return firstValueFrom(
      this.userServiceClient.send(RMQ_MESSAGES.USER.GET_LIST, query)
    );
  }

  @Auth(true)
  @Get(API_ENDPOINTS.USER.GET_ONE)
  @ApiOperation({ summary: 'User Profile' })
  public profile(@Param('id') userId: string) {
    return firstValueFrom(
      this.userServiceClient.send(RMQ_MESSAGES.USER.PROFILE, userId)
    );
  }

  @Auth(true)
  @Patch(API_ENDPOINTS.USER.UPDATE)
  @ApiOperation({ summary: 'Update Profile' })
  public updateProfile(
    @Param('id') userId: string,
    @Query() query: UpdateProfileDto
  ) {
    query.userId = userId;
    return firstValueFrom(
      this.userServiceClient.send(RMQ_MESSAGES.USER.UPDATE_PROFILE, query)
    );
  }

  @Auth(true)
  @Patch(API_ENDPOINTS.USER.EDIT_USER)
  @ApiOperation({ summary: 'Edit User by Admin' })
  public editUser(
    @Param('id') userId: string,
    @Query() query: EditUserByAdminDto
  ) {
    query.userId = userId;
    return firstValueFrom(
      this.userServiceClient.send(RMQ_MESSAGES.USER.EDIT_USER, query)
    );
  }
}
