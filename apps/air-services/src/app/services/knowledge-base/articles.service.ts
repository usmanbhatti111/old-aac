import { HttpStatus, Injectable } from '@nestjs/common';
import { successResponse } from '@shared/constants';
import { ArticlesRepository } from '@shared';
import { RpcException } from '@nestjs/microservices';
import { WriteArticleDTO } from '@shared/dto';

@Injectable()
export class ArticlesService {
  constructor(private articlesRepository: ArticlesRepository) {}

  async writeArticle(payload: WriteArticleDTO) {
    try {
      const newPayload: any = payload;
      const response = await this.articlesRepository.create({ ...newPayload });
      return successResponse(HttpStatus.CREATED, 'Success', response);
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
