import { HttpStatus, Injectable } from '@nestjs/common';
import { errorResponse, successResponse } from '@shared/constants';
import { SignupDto } from '@shared/dto';
import { PrismaService } from '@shared/services';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signup(payload: SignupDto) {
    try {
      const res = await this.prisma.testStuff.findFirstOrThrow({
        where: { email: payload.email },
      });
      return successResponse(HttpStatus.CREATED, 'Success', res);
    } catch (error) {
      return errorResponse(HttpStatus.BAD_REQUEST, 'Bad Request', error?.name);
    }
  }
}
