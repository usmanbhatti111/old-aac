import { HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { ProductFeaturesRepository } from '@shared';
import { ResponseMessage, successResponse } from '@shared/constants';
import {
  AddProductFeatureDto,
  DeleteProductFeaturesDto,
  EditProductFeatureDto,
  GetProductsFeaturesDto,
  IdDto,
} from '@shared/dto';
import mongoose from 'mongoose';

@Injectable()
export class ProductFeaturesService {
  constructor(private productFeaturesRepository: ProductFeaturesRepository) {}

  async addProductFeature(payload: AddProductFeatureDto) {
    try {
      const res = await this.productFeaturesRepository.create(payload);

      const response = successResponse(
        HttpStatus.CREATED,
        ResponseMessage.SUCCESS,
        res
      );

      return response;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async getProductsFeatures(payload: GetProductsFeaturesDto) {
    try {
      const filterQuery = { isDeleted: false };

      const { productId, search } = payload;
      if (productId) {
        filterQuery['productId'] = new mongoose.Types.ObjectId(productId);
      }

      if (search) {
        filterQuery['$or'] = [
          {
            name: { $regex: search, $options: 'i' },
            description: { $regex: search, $options: 'i' },
          },
        ];
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

      let { limit, page } = payload;
      limit = limit ? limit : 10;
      page = page ? page : 1;
      const offset = limit * (page - 1);

      const res = await this.productFeaturesRepository.paginate({
        filterQuery,
        offset,
        limit,
        pipelines,
      });

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

  async getProductFeature(payload: IdDto) {
    try {
      const res = await this.productFeaturesRepository.findOne({
        _id: payload.id,
      });

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

  async editProductFeature(payload: EditProductFeatureDto) {
    try {
      const id = payload.id;
      delete payload.id;

      const res = await this.productFeaturesRepository.findByIdAndUpdate(
        { _id: id },
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

  async deleteProductFeature(payload: DeleteProductFeaturesDto) {
    try {
      const ids = payload.ids.split(',');

      const res = await this.productFeaturesRepository.updateMany(
        { _id: { $in: ids } },
        { isDeleted: true, deletedBy: payload?.deletedBy }
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
}
