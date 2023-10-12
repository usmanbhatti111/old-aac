import {
  Injectable,
  Inject,
  CanActivate,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ClientProxy } from '@nestjs/microservices';
import { RMQ_MESSAGES, SERVICES } from '@shared/constants';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @Inject(SERVICES.USER) private userServiceClient: ClientProxy
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const secured = this.reflector.get<string[]>(
      'secured',
      context.getHandler()
    );

    if (!secured) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const authorization = request.headers.authorization;

    if (!authorization)
      throw new BadRequestException('Authorization Token Missing!');

    const verifyToken = await firstValueFrom(
      this.userServiceClient.send(RMQ_MESSAGES.AUTHENTICATION.VERIFY_TOKEN, {
        token: authorization?.split(' ')?.[1],
      })
    );

    request.user = verifyToken.data;

    return true;
  }
}
