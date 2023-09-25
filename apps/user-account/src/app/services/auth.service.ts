import { Injectable } from '@nestjs/common';
import { errorResponse, successResponse } from '@shared/constants';
import { SignupDto } from '@shared/dto';
import { PrismaService } from '@shared/services';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signup(payload: SignupDto) {
    try {
      let res = await this.prisma.testStuff.findFirstOrThrow({
        where: { email: payload.email },
      });
      return successResponse(200, 'Success', res);
    } catch (error) {
      return errorResponse(400, 'Bad Request', error?.name);
    }
  }
}
