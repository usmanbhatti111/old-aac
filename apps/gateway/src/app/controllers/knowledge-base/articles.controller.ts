import { Controller, Inject, Post, Body, Req } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import {
  API_ENDPOINTS,
  API_TAGS,
  CONTROLLERS,
  RMQ_MESSAGES,
  SERVICES,
} from '@shared/constants';
import { WriteArticleDTO } from '@shared/dto';
import { firstValueFrom } from 'rxjs';
import { Auth } from '../../decorators/auth.decorator';
import { AppRequest } from '../../shared/interface/request.interface';
@ApiBearerAuth()
@ApiTags(API_TAGS.ARTICLES)
@Controller(CONTROLLERS.ARTICLES)
export class ArticlesController {
  constructor(
    @Inject(SERVICES.AIR_SERVICES) private airServiceClient: ClientProxy
  ) {}

  @Auth(true)
  @Post(API_ENDPOINTS.AIR_SERVICES.KNOWLEDGE_BASE.ARTICLES.WRITE)
  public async writeArticle(
    @Body() payload: WriteArticleDTO,
    @Req() req: AppRequest
  ) {
    try {
      payload.author = req?.user?._id;
      const response = await firstValueFrom(
        this.airServiceClient.send(
          RMQ_MESSAGES.AIR_SERVICES.KNOWLEDGE_BASE.ARTICLES.WRITE,
          payload
        )
      );

      return response;
    } catch (err) {
      throw new RpcException(err);
    }
  }
}
