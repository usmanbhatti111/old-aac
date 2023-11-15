import { HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { OrganizationRepository, ProductsRepository } from '@shared';
import { ResponseMessage, successResponse } from '@shared/constants';

@Injectable()
export class DropdownService {
  constructor(
    private organizationRepository: OrganizationRepository,
    private productsRepository: ProductsRepository
  ) {}
  async getallOrganizations() {
    try {
      const pipelines = [
        {
          $match: {
            isDeleted: false,
          },
        },
        {
          $project: {
            _id: 1,
            name: 1,
          },
        },
      ];

      const result = await this.organizationRepository.aggregate(pipelines);

      return successResponse(HttpStatus.OK, ResponseMessage.SUCCESS, result);
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async getallProducts() {
    try {
      const pipelines = [
        {
          $match: {
            isDeleted: false,
          },
        },
        {
          $project: {
            _id: 1,
            name: 1,
          },
        },
      ];

      const result = await this.productsRepository.aggregate(pipelines);

      return successResponse(HttpStatus.OK, ResponseMessage.SUCCESS, result);
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
