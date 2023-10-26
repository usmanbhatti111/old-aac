import { Controller, Inject, Post, Body } from '@nestjs/common';
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
@ApiBearerAuth()
@ApiTags(API_TAGS.KNOWLEDGE_BASE)
@Controller(CONTROLLERS.KNOWLEDGE_BASE)
export class KnowledgeBaseController {
  constructor(
    @Inject(SERVICES.AIR_SERVICES) private airServiceClient: ClientProxy
  ) {}

  @Auth(true)
  @Post(API_ENDPOINTS.AIR_SERVICES.KNOWLEDGE_BASE.WRITE)
  public async writeArticle(@Body() payload: WriteArticleDTO) {
    try {
      const response = await firstValueFrom(
        this.airServiceClient.send(
          RMQ_MESSAGES.AIR_SERVICES.KNOWLEDGE_BASE.WRITE,
          payload
        )
      );

      return response;
    } catch (err) {
      throw new RpcException(err);
    }
  }
}
