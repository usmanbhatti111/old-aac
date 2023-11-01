import { HttpStatus, Injectable } from '@nestjs/common';
import { EArticlesStatus, successResponse } from '@shared/constants';
import { ArticlesRepository } from '@shared';
import { RpcException } from '@nestjs/microservices';
import {
  GetArticlesDto,
  GetUnapprovedArticlesDto,
  WriteArticleDTO,
} from '@shared/dto';
import { Types } from 'mongoose';

@Injectable()
export class ArticlesService {
  constructor(private articlesRepository: ArticlesRepository) {}

  async writeArticle(payload: WriteArticleDTO) {
    try {
      const { isApprovel } = payload;
      const newPayload: any = payload;
      if (isApprovel) {
        newPayload['isApproved'] = false;
        newPayload['status'] = EArticlesStatus.DRAFT;
      }
      const response = await this.articlesRepository.create({ ...newPayload });
      return successResponse(HttpStatus.CREATED, 'Success', response);
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async getArticles(payload: GetArticlesDto) {
    try {
      const { status, organizationId, authorId, search, page, limit } = payload;
      const filterQuery = {
        organizationId,
      };

      const pipeline: any[] = [
        {
          $lookup: {
            from: 'users',
            localField: 'author',
            foreignField: '_id',
            as: 'author',
          },
        },
        {
          $unwind: {
            path: '$author',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $addFields: {
            authorName: {
              $concat: ['$author.firstName', ' ', '$author.lastName'],
            },
          },
        },
        {
          $lookup: {
            from: 'users',
            localField: 'approver',
            foreignField: '_id',
            as: 'approver',
          },
        },
        {
          $unwind: {
            path: '$approver',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $addFields: {
            approverName: {
              $concat: ['$approver.firstName', ' ', '$approver.lastName'],
            },
          },
        },
        {
          $lookup: {
            from: 'folders',
            localField: 'folder',
            foreignField: '_id',
            as: 'folder',
          },
        },
        {
          $unwind: {
            path: '$folder',
            preserveNullAndEmptyArrays: true,
          },
        },
      ];

      if (authorId) filterQuery['author'] = new Types.ObjectId(authorId);
      if (status) filterQuery['status'] = status;
      if (search) {
        const regex = new RegExp(search, 'i');
        pipeline.push({
          $match: {
            $or: [
              { authorName: regex },
              { details: regex },
              { 'folder.name': regex },
              { status: regex },
              { approverName: regex },
            ],
          },
        });
      }

      const response = await this.articlesRepository.newPaginate(
        filterQuery,
        pipeline,
        { page, limit }
      );
      return successResponse(HttpStatus.OK, 'Success', response);
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async getUnapprovedArticles(payload: GetUnapprovedArticlesDto) {
    try {
      const { userId, page, limit } = payload;

      const filterQuery = {
        approver: new Types.ObjectId(userId),
        isApproved: false,
      };

      const pipeline = [
        {
          $lookup: {
            from: 'users',
            localField: 'author',
            foreignField: '_id',
            as: 'author',
          },
        },
        {
          $unwind: {
            path: '$author',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $addFields: {
            authorName: {
              $concat: ['$author.firstName', ' ', '$author.lastName'],
            },
          },
        },
        {
          $lookup: {
            from: 'users',
            localField: 'approver',
            foreignField: '_id',
            as: 'approver',
          },
        },
        {
          $unwind: {
            path: '$approver',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $addFields: {
            approverName: {
              $concat: ['$approver.firstName', ' ', '$approver.lastName'],
            },
          },
        },
        {
          $lookup: {
            from: 'folders',
            localField: 'folder',
            foreignField: '_id',
            as: 'folder',
          },
        },
        {
          $unwind: {
            path: '$folder',
            preserveNullAndEmptyArrays: true,
          },
        },
      ];
      const response = await this.articlesRepository.newPaginate(
        filterQuery,
        pipeline,
        {
          page,
          limit,
        }
      );
      return successResponse(HttpStatus.CREATED, 'Success', response);
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
