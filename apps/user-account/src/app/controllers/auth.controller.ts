import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RMQ_MESSAGES } from '@shared/constants';
import { SignupDto } from '@shared/dto';
import { AuthService } from '../services/auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern(RMQ_MESSAGES.AUTHENTICATION.SIGNUP)
  signup(@Payload() payload: SignupDto) {
    return this.authService.signup(payload);
  }
}
