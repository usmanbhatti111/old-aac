import { HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { ProductsRepository } from '@shared';
import { ResponseMessage, successResponse } from '@shared/constants';
import {
  AddProductDto,
  EditProductDto,
  GetProductsDto,
  MediaObject,
} from '@shared/dto';
import { S3Service } from '@shared/services';
import dayjs from 'dayjs';

@Injectable()
export class ProductsService {
  constructor(
    private productsRepository: ProductsRepository,
    private s3: S3Service
  ) {}

  async addProduct(payload: AddProductDto) {
    try {
      const { file } = payload;

      const s3Response = await this.s3.uploadFile(file, 'products/{uuid}');

      const logo: MediaObject = {
        ...s3Response,
        size: file.size,
        mimetype: file.mimetype,
      };

      payload.logo = logo;

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
      const { status, dateStart, dateEnd } = payload;

      const filterQuery = { isDeleted: false };

      if (status) {
        filterQuery['status'] = status;
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
      const { id, file } = payload;

      const filter = { _id: id };

      let res = await this.productsRepository.findOne(filter);

      if (file) {
        if (res?.logo) {
          const { url } = res.logo;
          await this.s3.deleteFile(url);
          const s3Response = await this.s3.uploadFile(file, 'products/{uuid}');

          const logo: MediaObject = {
            ...s3Response,
            size: file?.size,
            mimetype: file?.mimetype,
          };

          payload.logo = logo;
        } else {
          const s3Response = await this.s3.uploadFile(file, 'products/{uuid}');

          const logo: MediaObject = {
            ...s3Response,
            size: file.size,
            mimetype: file.mimetype,
          };

          payload.logo = logo;
        }
      }

      res = await this.productsRepository.findOneAndUpdate(filter, payload);

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
