import { HttpStatus, Injectable } from '@nestjs/common';
import {
  ResponseMessage,
  errorResponse,
  successResponse,
} from '@shared/constants';
import { AddProductDto, EditProductDto, GetProductsDto } from '@shared/dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Products } from '@shared/schemas';
import dayjs from 'dayjs';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Products.name) private readonly productsModel: Model<Products>
  ) {}

  async addProduct(payload: AddProductDto) {
    try {
      const res = await this.productsModel.create(payload);

      if (!res) {
        return errorResponse(
          HttpStatus.BAD_REQUEST,
          ResponseMessage.BAD_REQUEST
        );
      }

      const response = successResponse(
        HttpStatus.CREATED,
        ResponseMessage.SUCCESS,
        res
      );
      return response;
    } catch (error) {
      const err = errorResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        ResponseMessage.BAD_REQUEST
      );
      return err;
    }
  }

  async getProducts(payload: GetProductsDto) {
    try {
      const filters = { isDeleted: false };

      if (payload.isActive) {
        filters['isActive'] = payload.isActive;
      }

      if (payload.dateStart && payload.dateEnd) {
        const startOfDate = dayjs(payload.dateStart)
          .startOf('day')
          .toISOString();
        const endOfDate = dayjs(payload.dateEnd).endOf('day').toISOString();

        filters['createdAt'] = { $gte: startOfDate, $lte: endOfDate };
      }

      const res = await this.productsModel.find(filters).sort('-createdAt');

      const response = successResponse(
        HttpStatus.CREATED,
        ResponseMessage.SUCCESS,
        res
      );

      return response;
    } catch (error) {
      const err = errorResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        ResponseMessage.BAD_REQUEST
      );
      return err;
    }
  }

  async editProduct(payload: EditProductDto) {
    try {
      const id = payload.id;
      delete payload.id;

      const res = await this.productsModel.findByIdAndUpdate(id, payload, {
        new: true,
      });

      if (!res) {
        return errorResponse(HttpStatus.BAD_REQUEST, ResponseMessage.NOT_FOUND);
      }

      const response = successResponse(
        HttpStatus.OK,
        ResponseMessage.SUCCESS,
        res
      );

      return response;
    } catch (error) {
      const err = errorResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        ResponseMessage.BAD_REQUEST
      );
      return err;
    }
  }
}
