import { HttpStatus, Injectable } from '@nestjs/common';
import { EArticlesStatus, successResponse } from '@shared/constants';
import { ArticlesRepository } from '@shared';
import { RpcException } from '@nestjs/microservices';
import {
  DeleteArticleRequestDto,
  GetArticlesRequestDto,
  GetUnapprovedArticlesRequestDto,
  UpdateArticleRequestDto,
  WriteArticleRequestDTO,
} from '@shared/dto';
import { Types } from 'mongoose';

@Injectable()
export class ArticlesService {
  constructor(private articlesRepository: ArticlesRepository) {}

  async writeArticle(payload: WriteArticleRequestDTO) {
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

  async getArticles(payload: GetArticlesRequestDto) {
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

  async getUnapprovedArticles(payload: GetUnapprovedArticlesRequestDto) {
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
      return successResponse(HttpStatus.OK, 'Success', response);
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async updateArticle(payload: UpdateArticleRequestDto) {
    try {
      const { id, isApprovel, approver } = payload;
      delete payload?.id;

      if (isApprovel === false) {
        payload.isApproved = true;
        payload.approver = null;
        payload.status = EArticlesStatus.PUBLISHED;
        payload.reviewDate = null;
      } else if (isApprovel === true) {
        const findArticle = await this.articlesRepository.findOne({ _id: id });

        if (approver != findArticle?.approver) {
          payload.isApproved = false;
          payload.status = EArticlesStatus.DRAFT;
        }
      }

      const response = await this.articlesRepository.findByIdAndUpdate(
        { _id: id },
        payload
      );
      return successResponse(HttpStatus.OK, 'Update successfully', response);
    } catch (error) {
      throw new RpcException(error);
    }
  }
  async deleteArticle(payload: DeleteArticleRequestDto) {
    try {
      const { ids } = payload;
      const response = await this.articlesRepository.deleteMany({}, ids);
      return successResponse(HttpStatus.OK, 'Deleted successfully', response);
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
