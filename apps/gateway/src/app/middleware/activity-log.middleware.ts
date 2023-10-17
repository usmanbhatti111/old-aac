import {
  BadRequestException,
  Inject,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { RequestDescriptions } from '../shared/request-descriptions.enum';
import { RMQ_MESSAGES, SERVICES } from '@shared/constants';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import mongoose from 'mongoose';

@Injectable()
export class ActivityLogMiddleware implements NestMiddleware {
  constructor(@Inject(SERVICES.USER) private userServiceClient: ClientProxy) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const { originalUrl, method, url } = req;
    try {
      let request = originalUrl
        .replace(url.replace('/', ''), '')
        .replace(/\//g, '_')
        .toUpperCase();
      const splitRequest = request.split('_');
      splitRequest[splitRequest.length - 1];
      if (
        mongoose.Types.ObjectId.isValid(splitRequest[splitRequest.length - 1])
      ) {
        request = request.replace(splitRequest[splitRequest.length - 1], 'ID');
      }
      const description =
        RequestDescriptions[`${method}${request}`.toUpperCase()] ||
        'Unknown Request';
      const verifyToken = await firstValueFrom(
        this.userServiceClient.send(RMQ_MESSAGES.AUTHENTICATION.VERIFY_TOKEN, {
          token: req.headers.authorization?.split(' ')?.[1],
        })
      );
      await firstValueFrom(
        this.userServiceClient.send(
          { cmd: RMQ_MESSAGES.LOGS.CREATE },
          {
            description,
            user: verifyToken?.data?._id,
          }
        )
      );
    } catch (error) {
      throw new BadRequestException('Error saving request log:');
    }

    next();
  }
}
