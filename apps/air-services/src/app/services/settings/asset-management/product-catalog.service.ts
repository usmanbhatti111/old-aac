import { HttpStatus, Injectable } from '@nestjs/common';
import { successResponse } from '@shared/constants';
import { ProductCatalogRepository } from '@shared';
import { RpcException } from '@nestjs/microservices';
import { AddProductCatalogRequestDTO } from '@shared/dto';

@Injectable()
export class ProductCatalogService {
  constructor(private productCatalogRepository: ProductCatalogRepository) {}

  async addProductCatalog(payload: AddProductCatalogRequestDTO) {
    try {
      const response = await this.productCatalogRepository.create({
        ...payload,
      });
      return successResponse(HttpStatus.CREATED, 'Success', response);
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
