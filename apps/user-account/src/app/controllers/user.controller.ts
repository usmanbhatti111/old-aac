import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { User } from '@shared';
import { RMQ_MESSAGES } from '@shared/constants';
import { UserService } from '../services/user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern(RMQ_MESSAGES.USER.CREATE)
  createNewUser(@Payload() payload: User) {
    return this.userService.create(payload);
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
}
