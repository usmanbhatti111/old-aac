import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RMQ_MESSAGES } from '@shared/constants';
import {
  GetArticlesRequestDto,
  GetUnapprovedArticlesRequestDto,
  WriteArticleRequestDTO,
} from '@shared/dto';
import { ArticlesService } from '../../services/knowledge-base/articles.service';
@Controller()
export class ArticlesController {
  constructor(private articleService: ArticlesService) {}

  @MessagePattern(RMQ_MESSAGES.AIR_SERVICES.KNOWLEDGE_BASE.ARTICLES.WRITE)
  writeArticle(@Payload() payload: WriteArticleRequestDTO) {
    return this.articleService.writeArticle(payload);
  }
  @MessagePattern(RMQ_MESSAGES.AIR_SERVICES.KNOWLEDGE_BASE.ARTICLES.GET)
  getArticles(@Payload() payload: GetArticlesRequestDto) {
    return this.articleService.getArticles(payload);
  }

  @MessagePattern(
    RMQ_MESSAGES.AIR_SERVICES.KNOWLEDGE_BASE.ARTICLES.GET_UNAPPROVED_ARTICLES
  )
  getUnapprovedArticles(@Payload() payload: GetUnapprovedArticlesRequestDto) {
    return this.articleService.getUnapprovedArticles(payload);
  }
}
