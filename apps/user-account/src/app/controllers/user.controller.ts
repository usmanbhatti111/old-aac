import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RMQ_MESSAGES } from '@shared/constants';
import {
  GetAdminUserDto,
  CreateUserDto,
  UpdateProfileDto,
  EditUserByAdminDto,
} from '@shared/dto';
import { UserService } from '../services/user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern(RMQ_MESSAGES.USER.CREATE)
  createNewUser(@Payload() payload: CreateUserDto) {
    return this.userService.create(payload);
  }

  @MessagePattern(RMQ_MESSAGES.USER.GET_LIST)
  listUsers(@Payload() payload: GetAdminUserDto) {
    return this.userService.listUsers(payload);
  }

  @MessagePattern(RMQ_MESSAGES.USER.FIND_BY_EMAIL)
  authUserInfo(@Payload() payload: { email: string }) {
    return this.userService.findUserByUniqueFields({ email: payload.email });
  }

  @MessagePattern(RMQ_MESSAGES.USER.FIND_BY_COGNITO)
  findByCognitoId(@Payload() payload: { cognitoId: string }) {
    return this.userService.findUserByUniqueFields({
      cognitoId: payload.cognitoId,
    });
  }

  @MessagePattern(RMQ_MESSAGES.USER.PROFILE)
  userProfile(userId: string) {
    return this.userService.userProfile(userId);
  }

  @MessagePattern(RMQ_MESSAGES.USER.UPDATE_PROFILE)
  updateProfile(@Payload() payload: UpdateProfileDto) {
    return this.userService.updateProfile(payload);
  }

  @MessagePattern(RMQ_MESSAGES.USER.UPDATE_PROFILE)
  editUser(@Payload() payload: EditUserByAdminDto) {
    return this.userService.editUserByAdmin(payload);
  }
}
