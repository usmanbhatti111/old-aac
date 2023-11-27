import {
  Controller,
  Inject,
  Post,
  Body,
  Req,
  Get,
  Query,
  Patch,
  Delete,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { ApiTags, ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import {
  API_ENDPOINTS,
  API_TAGS,
  CONTROLLERS,
  RMQ_MESSAGES,
  SERVICES,
} from '@shared/constants';
import {
  DeleteArticleRequestDto,
  DeleteArticleResponseDto,
  GetArticlesRequestDto,
  GetArticlesResponseDto,
  GetUnapprovedArticlesRequestDto,
  GetUnapprovedArticlesResponseDto,
  UpdateArticleRequestDto,
  UpdateArticleResponseDto,
  WriteArticleRequestDTO,
  WriteArticleResponseDto,
} from '@shared/dto';
import { firstValueFrom } from 'rxjs';
import { Auth } from '../../../decorators/auth.decorator';
import { AppRequest } from '../../../shared/interface/request.interface';
@ApiBearerAuth()
@ApiTags(API_TAGS.ARTICLES)
@Controller(CONTROLLERS.ARTICLES)
export class ArticlesController {
  constructor(
    @Inject(SERVICES.AIR_SERVICES) private airServiceClient: ClientProxy
  ) {}

  @Auth(true)
  @Post()
  @ApiOkResponse({ type: WriteArticleResponseDto })
  public async writeArticle(
    @Body() payload: WriteArticleRequestDTO,
    @Req() req: AppRequest
  ): Promise<WriteArticleResponseDto> {
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
  @ApiOkResponse({ type: GetArticlesResponseDto })
  public async getArticles(
    @Query() queryParams: GetArticlesRequestDto,
    @Req() req: AppRequest
  ): Promise<GetArticlesResponseDto> {
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
  @Get(
    API_ENDPOINTS.AIR_SERVICES.KNOWLEDGE_BASE.ARTICLES.GET_UNAPPROVED_ARTICLES
  )
  @ApiOkResponse({ type: GetUnapprovedArticlesResponseDto })
  public async getUnapprovedArticles(
    @Query() queryParams: GetUnapprovedArticlesRequestDto,
    @Req() req: AppRequest
  ): Promise<GetUnapprovedArticlesResponseDto> {
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

  @Auth(true)
  @Patch()
  @ApiOkResponse({ type: UpdateArticleResponseDto })
  public async updateArticle(
    @Body() body: UpdateArticleRequestDto
  ): Promise<UpdateArticleResponseDto> {
    try {
      const response = await firstValueFrom(
        this.airServiceClient.send(
          RMQ_MESSAGES.AIR_SERVICES.KNOWLEDGE_BASE.ARTICLES.UPDATE,
          body
        )
      );

      return response;
    } catch (err) {
      throw new RpcException(err);
    }
  }

  @Auth(true)
  @Delete()
  @ApiOkResponse({ type: DeleteArticleResponseDto })
  public async deleteArticle(
    @Query() queryParams: DeleteArticleRequestDto
  ): Promise<DeleteArticleResponseDto> {
    try {
      const response = await firstValueFrom(
        this.airServiceClient.send(
          RMQ_MESSAGES.AIR_SERVICES.KNOWLEDGE_BASE.ARTICLES.DELETE,
          queryParams
        )
      );

      return response;
    } catch (err) {
      throw new RpcException(err);
    }
  }
}
