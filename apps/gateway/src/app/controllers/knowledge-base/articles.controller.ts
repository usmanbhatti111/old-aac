import {
  Controller,
  Inject,
  Post,
  Body,
  Req,
  Get,
  Query,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import {
  API_ENDPOINTS,
  API_TAGS,
  CONTROLLERS,
  RMQ_MESSAGES,
  SERVICES,
} from '@shared/constants';
import {
  GetArticlesDto,
  GetUnapprovedArticlesDto,
  WriteArticleDTO,
} from '@shared/dto';
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
  @Post()
  public async writeArticle(
    @Body() payload: WriteArticleDTO,
    @Req() req: AppRequest
  ): Promise<any> {
    try {
      payload.author = req?.user?._id;
      payload.organizationId = req?.user?.organization;
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

  @Auth(true)
  @Get()
  public async getArticles(
    @Query() queryParams: GetArticlesDto,
    @Req() req: AppRequest
  ): Promise<any> {
    try {
      queryParams.organizationId = req?.user?.organization;
      const response = await firstValueFrom(
        this.airServiceClient.send(
          RMQ_MESSAGES.AIR_SERVICES.KNOWLEDGE_BASE.ARTICLES.GET,
          queryParams
        )
      );

      return response;
    } catch (err) {
      throw new RpcException(err);
    }
  }

  @Auth(true)
  @Get(API_ENDPOINTS.KNOWLEDGE_BASE.ARTICLES.GET_UNAPPROVED_ARTICLES)
  public async getUnapprovedArticles(
    @Query() queryParams: GetUnapprovedArticlesDto,
    @Req() req: AppRequest
  ): Promise<any> {
    try {
      queryParams.userId = req?.user?._id;
      queryParams.organizationId = req?.user?.organization;
      const response = await firstValueFrom(
        this.airServiceClient.send(
          RMQ_MESSAGES.AIR_SERVICES.KNOWLEDGE_BASE.ARTICLES
            .GET_UNAPPROVED_ARTICLES,
          queryParams
        )
      );

      return response;
    } catch (err) {
      throw new RpcException(err);
    }
  }
}
