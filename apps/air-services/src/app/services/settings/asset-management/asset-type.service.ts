import { Injectable } from '@nestjs/common';
import { AssetTypeRepository } from '@shared';
import { AddAssetTypeDto, ListAssetTypeDto } from '@shared/dto';
import { RpcException } from '@nestjs/microservices';
@Injectable()
export class AssetTypeService {
  constructor(private readonly assettypeRepository: AssetTypeRepository) {}

  async addAssetType(payload: AddAssetTypeDto) {
    try {
      const res = await this.assettypeRepository.create({ ...payload });
      return res;
    } catch (error) {
      return new RpcException(error);
    }
  }
  async getAssetTypeList(payload: ListAssetTypeDto) {
    try {
      const { limit, page, search } = payload;
      const offset = limit * (page - 1);
      const filterQuery = {};
      const pipeline: any = [];

      if (search) {
        pipeline.push({
          $match: {
            Name: { $regex: search, $options: 'i' },
          },
        });
      }
      const res = await this.assettypeRepository.paginate({
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
