import { HttpStatus, Injectable } from '@nestjs/common';
import { errorResponse, successResponse } from '@shared/constants';
import { VendorsRepository } from '@shared';
import { ListVendorsDto } from '@shared/dto';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class VendorsService {
  constructor(private readonly vendorsRepository: VendorsRepository) {}

  async addVendor(payload) {
    try {
      const res = await this.vendorsRepository.create({
        ...payload,
      });
      return successResponse(HttpStatus.CREATED, 'Success', res);
    } catch (error) {
      return errorResponse(HttpStatus.BAD_REQUEST, 'Bad Request', error?.name);
    }
  }

  async getVendors(payload: ListVendorsDto) {
    try {
      const { limit, page, search, requestId } = payload;
      const offset = limit * (page - 1);
      const filterQuery = { companyId: requestId };
      const pipelines: any = [];

      if (search) {
        pipelines.push({
          $match: {
            name: { $regex: search, $options: 'i' },
          },
        });
      }
      const res = await this.vendorsRepository.paginate({
        filterQuery,
        offset,
        limit,
        pipelines,
      });
      return res;
    } catch (error) {
      return new RpcException(error);
    }
  }
}
