import { HttpStatus, Injectable } from '@nestjs/common';
import { successResponse } from '@shared/constants';
import { VendorsRepository } from '@shared';
import { AddVendorRequestDTO, ListVendorsRequestDto } from '@shared/dto';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class VendorsService {
  constructor(private readonly vendorsRepository: VendorsRepository) {}

  async addVendor(payload: AddVendorRequestDTO) {
    try {
      const res = await this.vendorsRepository.create({
        ...payload,
      });
      return successResponse(HttpStatus.CREATED, 'Success', res);
    } catch (error) {
      return new RpcException(error);
    }
  }

  async getVendors(payload: ListVendorsRequestDto) {
    try {
      const { limit, page, search, companyId } = payload;
      const offset = page;
      const filterQuery = { companyId };
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
      return successResponse(HttpStatus.OK, 'Success', res);
    } catch (error) {
      return new RpcException(error);
    }
  }
}
