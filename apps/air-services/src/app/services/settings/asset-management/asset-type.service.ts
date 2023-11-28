import { HttpStatus, Injectable } from '@nestjs/common';
import { AssetTypeRepository } from '@shared';
import { RpcException } from '@nestjs/microservices';
import { AddAssetTypeDto, ListAssetTypeDto } from '@shared/dto';
import { successResponse } from '@shared/constants';
@Injectable()
export class AssetTypeService {
  constructor(private readonly assettypeRepository: AssetTypeRepository) {}

  async addAssetType(payload: AddAssetTypeDto) {
    try {
      const response = await this.assettypeRepository.create({ ...payload });
      return successResponse(HttpStatus.CREATED, `Success`, response);
    } catch (error) {
      return new RpcException(error);
    }
  }
  async getAssetTypeList(payload: ListAssetTypeDto) {
    try {
      const { limit, page, search, companyId } = payload;
      const offset = page;
      const filterQuery = { companyId };
      const pipelines: any = [];
      if (search) {
        pipelines.push({
          $match: {
            Name: { $regex: search, $options: 'i' },
          },
        });
      }
      const response = await this.assettypeRepository.paginate({
        filterQuery,
        offset,
        limit,
        pipelines,
      });
      return successResponse(HttpStatus.CREATED, `Success`, response);
    } catch (error) {
      return new RpcException(error);
    }
  }
}
