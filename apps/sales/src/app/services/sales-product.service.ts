import { ConflictException, HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { SalesProductRepository } from '@shared';
import { ResponseMessage, successResponse } from '@shared/constants';
import {
  CreateSalesProductDto,
  DeleteSalesProductDto,
  UpdateSalesProductDto,
  GetSalesProductsDto,
  IdDto,
} from '@shared/dto';

@Injectable()
export class SalesProductService {
  constructor(private salesProductRepository: SalesProductRepository) {}

  async createSalesProduct(payload: CreateSalesProductDto) {
    try {
      const existingProduct =
        await this.salesProductRepository.find({
          name: payload?.name,
        });
      if (existingProduct.length > 0) {
        return new ConflictException(
          'Product with the same name already exist.'
        );
      }
      const res = await this.salesProductRepository.create(payload);
      return successResponse(HttpStatus.CREATED, ResponseMessage.CREATED, res);
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async getSalesProducts(payload: GetSalesProductsDto) {
    try {
      const { search } = payload;

      const filterQuery = { isDeleted: false };

      if (search) {
        const keyword = { $regex: search, $options: 'i' };
        filterQuery['$or'] = [
          {
            name: keyword
          },
          {
            description: keyword
          },
          {
            sku: keyword
          }
        ];
      }

      let { limit, page } = payload;
      limit = limit ? limit : 10;
      page = page ? page : 1;
      const offset = limit * (page - 1);

      const res = await this.salesProductRepository.paginate({
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

  async getSalesProduct(payload: IdDto) {
    try {
      const { id } = payload;

      const filter = { _id: id };

      const res = await this.salesProductRepository.findOne(filter);

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

  async updateSalesProduct(payload: UpdateSalesProductDto) {
    try {
      const { id } = payload;

      const filter = { _id: id };

      const res = await this.salesProductRepository.findOneAndUpdate(
        filter,
        payload
      );

      return successResponse(HttpStatus.OK, ResponseMessage.SUCCESS, res);
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async deleteSalesProduct(payload: DeleteSalesProductDto) {
    try {
      const { id, deletedBy } = payload;

      const filter = { _id: id };

      const data = { isDeleted: true, deletedBy };

      await this.salesProductRepository.findOneAndUpdate(filter, data);

      return successResponse(HttpStatus.OK, ResponseMessage.SUCCESS, {});
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
