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
      const { productIds } = payload;

      delete payload.productIds;

      const data = productIds.map((productId) => {
        return { ...payload, productId };
      });

      const res = await this.productFeaturesRepository.createMany(data);

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

      const { productId } = payload;
      if (productId) {
        filterQuery['productId'] = new mongoose.Types.ObjectId(productId);
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
      ];

      let searchPipline = [];
      if (payload?.search) {
        const search = { $regex: payload.search, $options: 'i' };

        searchPipline = [
          {
            $match: {
              $or: [
                { name: search },
                { description: search },
                { productName: search },
              ],
            },
          },
        ];
      }

      const pipelines = [...productPipline, ...searchPipline];

      const limit = payload?.limit || 10;
      const offset = payload?.page || 1;

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
