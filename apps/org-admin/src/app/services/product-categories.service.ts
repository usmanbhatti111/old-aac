import { HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { ProductCategoriesRepository } from '@shared';
import { ResponseMessage, successResponse } from '@shared/constants';
import {
  AddProductCategoryDto,
  EditProductCategoryDto,
  GetProductCategoriesDto,
} from '@shared/dto';
import mongoose from 'mongoose';

@Injectable()
export class ProductCategoriesService {
  constructor(
    private productCategoriesRepository: ProductCategoriesRepository
  ) {}

  async addProductCategory(payload: AddProductCategoryDto) {
    try {
      const res = await this.productCategoriesRepository.create(payload);

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

  async getProductCategories(payload: GetProductCategoriesDto) {
    try {
      const { status, search, userId } = payload;

      const filterQuery = { isDeleted: false };

      // get product categories related to specific organization
      if (userId) {
        filterQuery['createdBy'] = new mongoose.Types.ObjectId(userId);
      }

      if (status) {
        filterQuery['status'] = status;
      }

      if (search) {
        filterQuery['$or'] = [
          {
            name: { $regex: search, $options: 'i' },
            description: { $regex: search, $options: 'i' },
          },
        ];
      }

      let { limit, page } = payload;
      limit = limit ? limit : 10;
      page = page ? page : 1;
      const offset = limit * (page - 1);

      const res = await this.productCategoriesRepository.paginate({
        filterQuery,
        offset,
        limit,
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

  async editProductCategory(payload: EditProductCategoryDto) {
    try {
      const { id } = payload;

      const filter = { _id: id };

      const res = await this.productCategoriesRepository.findOneAndUpdate(
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
}
