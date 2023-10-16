import { HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { ProductsRepository } from '@shared';
import { ResponseMessage, successResponse } from '@shared/constants';
import { AddProductDto, EditProductDto, GetProductsDto } from '@shared/dto';
import dayjs from 'dayjs';

@Injectable()
export class ProductsService {
  constructor(private productsRepository: ProductsRepository) {}

  async addProduct(payload: AddProductDto) {
    try {
      const res = await this.productsRepository.create(payload);

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

  async getProducts(payload: GetProductsDto) {
    try {
      const { isActive, dateStart, dateEnd } = payload;

      const filterQuery = { isDeleted: false };

      if (isActive) {
        filterQuery['isActive'] = isActive;
      }

      if (dateStart && dateEnd) {
        const startOfDate = dayjs(dateStart).startOf('day').toISOString();
        const endOfDate = dayjs(dateEnd).endOf('day').toISOString();

        filterQuery['createdAt'] = { $gte: startOfDate, $lte: endOfDate };
      }

      const res = await this.productsRepository.find(
        filterQuery,
        {},
        { sort: '-createdAt' }
      );

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

  async editProduct(payload: EditProductDto) {
    try {
      const { id } = payload;

      const filter = { _id: id };

      const res = await this.productsRepository.findOneAndUpdate(
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
