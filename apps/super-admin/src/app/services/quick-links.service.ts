import { HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { QuickLinksRepository } from '@shared';
import { ResponseMessage, successResponse } from '@shared/constants';
import {
  AddQuickLinkDto,
  DeleteQuickLinksDto,
  EditQuickLinkDto,
  GetQuickLinksDto,
} from '@shared/dto';
import dayjs from 'dayjs';

@Injectable()
export class QuickLinksService {
  constructor(private quickLinksRepository: QuickLinksRepository) {}

  async addQuickLink(payload: AddQuickLinkDto) {
    try {
      const res = await this.quickLinksRepository.create(payload);
      return successResponse(HttpStatus.CREATED, ResponseMessage.CREATED, res);
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async getQuickLinks(payload: GetQuickLinksDto) {
    try {
      let { page, limit } = payload;
      limit = limit ? limit : 10;
      page = page ? page : 1;
      const offset = limit * (page - 1);

      const filterQuery = { isDeleted: false };

      if (payload?.isActive) {
        filterQuery['isActive'] = payload.isActive;
      }

      if (payload?.productId) {
        filterQuery['productId'] = payload.productId;
      }

      if (payload?.dateStart && payload?.dateEnd) {
        const startOfDate = dayjs(payload.dateStart)
          .startOf('day')
          .toISOString();
        const endOfDate = dayjs(payload.dateEnd).endOf('day').toISOString();

        filterQuery['createdAt'] = { $gte: startOfDate, $lte: endOfDate };
      }

      const productPipline = [
        {
          $lookup: {
            from: 'products',
            localField: 'productId',
            foreignField: '_id',
            as: 'product',
          },
        },
        {
          $unwind: '$product',
        },
        {
          $addFields: {
            productName: '$product.name',
          },
        },
        {
          $project: {
            product: 0,
          },
        },
        {
          $match: {
            productName: {
              $regex: payload?.search ? payload.search : '',
              $options: 'i',
            },
          },
        },
      ];

      const pipelines = [...productPipline];

      const res = await this.quickLinksRepository.paginate({
        filterQuery,
        limit,
        offset,
        pipelines,
      });

      return successResponse(HttpStatus.OK, ResponseMessage.SUCCESS, res);
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async deleteQuickLinks(payload: DeleteQuickLinksDto) {
    try {
      const ids = payload?.ids?.split(',');

      const filterQuery = { _id: { $in: ids } };
      const updates = {
        isDeleted: true,
        deletedBy: payload?.deletedBy,
      };

      const res = await this.quickLinksRepository.updateMany(
        filterQuery,
        updates
      );

      let message: string;
      if (ids.length === res.modifiedCount) {
        message = `${ids.length > 1 ? 'Records' : 'Record'} has been Deleted`;
      } else {
        message = `${res.modifiedCount} ${
          res.modifiedCount > 1 ? 'Records' : 'Record'
        } has been deleted outoff ${ids.length}`;
      }

      const response = successResponse(HttpStatus.OK, message);

      return response;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async editQuickLinks(payload: EditQuickLinkDto) {
    try {
      const { id } = payload;

      const filter = { _id: id };

      const res = await this.quickLinksRepository.findOneAndUpdate(
        filter,
        payload
      );

      const response = successResponse(
        HttpStatus.OK,
        ResponseMessage.SUCCESS,
        res
      );

      return response;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async getQuickLinksGroupByProduct() {
    try {
      const pipelines = [
        {
          $lookup: {
            from: 'products',
            localField: 'productId',
            foreignField: '_id',
            as: 'product',
          },
        },
        {
          $unwind: '$product',
        },
        {
          $addFields: {
            productName: '$product.name',
          },
        },
        {
          $project: {
            product: 0,
          },
        },
        {
          $group: {
            _id: '$productId',
            products: { $push: '$$ROOT' },
          },
        },
        {
          $project: {
            _id: 0,
            products: 1,
          },
        },
      ];

      const res = await this.quickLinksRepository.aggregate(pipelines);

      // Initialize an empty object to store the transformed result
      const response = {};

      // Loop through the original result and organize it by product name
      res.forEach((item) => {
        item.products.forEach((product) => {
          const productName = product.productName;

          if (!response[productName]) {
            response[productName] = [];
          }

          response[productName].push(product);
        });
      });

      return successResponse(HttpStatus.OK, ResponseMessage.SUCCESS, response);
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
