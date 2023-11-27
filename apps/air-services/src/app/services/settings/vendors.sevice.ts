import { HttpStatus, Injectable } from '@nestjs/common';
import { errorResponse, successResponse } from '@shared/constants';
import { VendorsRepository } from '@shared';
import { ListVendorsDto } from '@shared/dto';
import { Types } from 'mongoose';
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
      const { limit, page, search, companyId } = payload;
      const offset = limit * (page - 1);
      const filterQuery = {};
      const pipeline: any = [];
      if (companyId) {
        filterQuery['companyId'] = new Types.ObjectId(companyId);
      }
      if (search) {
        pipeline.push({
          $match: {
            name: { $regex: search, $options: 'i' },
          },
        });
      }
      const res = await this.vendorsRepository.paginate({
        filterQuery,
        offset,
        limit,
        pipelines: pipeline,
      });
      return res;
    } catch (error) {
      return new RpcException(error);
    }
  }
}
