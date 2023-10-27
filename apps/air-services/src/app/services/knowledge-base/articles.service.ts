import { HttpStatus, Injectable } from '@nestjs/common';
import { successResponse } from '@shared/constants';
import { ArticlesRepository } from '@shared';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class ArticlesService {
  constructor(private articlesRepository: ArticlesRepository) {}

  async writeArticle(payload: any) {
    try {
      const res = await this.articlesRepository.create({ ...payload });
      return successResponse(HttpStatus.CREATED, 'Success', res);
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
