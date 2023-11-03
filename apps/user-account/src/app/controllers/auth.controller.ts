import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RMQ_MESSAGES } from '@shared/constants';
import {
  InitiateVerificationRequestDto,
  SignInDto,
  SignupDto,
  WebhookRequestDto,
} from '@shared/dto';
import { AuthService } from '../services/auth.service';
import { VerificationService } from '../services/verification.service';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly verificationService: VerificationService
  ) {}

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

  @MessagePattern(RMQ_MESSAGES.AUTHENTICATION.IG_VERIFICATION)
  initiateVerificationProcess(
    @Payload() payload: InitiateVerificationRequestDto
  ) {
    return this.verificationService.initiateVerification(payload);
  }

  @MessagePattern(RMQ_MESSAGES.AUTHENTICATION.IG_STATUS_UPDATE)
  updateIgStatus(@Payload() payload: WebhookRequestDto) {
    return this.verificationService.updateIgStatus(payload);
  }
}
