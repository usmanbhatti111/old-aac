import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RMQ_MESSAGES } from '@shared/constants';
import { SignInDto, SignupDto } from '@shared/dto';
import { AuthService } from '../services/auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern(RMQ_MESSAGES.AUTHENTICATION.SIGNUP)
  signUp(@Payload() payload: SignupDto) {
    return this.authService.signup(payload);
  }

  @MessagePattern(RMQ_MESSAGES.AUTHENTICATION.SIGNIN)
  signIn(@Payload() payload: SignInDto) {
    return this.authService.signin(payload);
  }

  @MessagePattern(RMQ_MESSAGES.AUTHENTICATION.VERIFY_TOKEN)
  verifyAccessToken(@Payload() payload: { token: string }) {
    return this.authService.verifyToken(payload.token, 'access');
  }
}
