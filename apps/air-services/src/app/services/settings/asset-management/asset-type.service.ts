import { HttpStatus, Injectable } from '@nestjs/common';
import { errorResponse, successResponse } from '@shared/constants';
import { AssetTypeRepository } from '@shared';
import { AddAssetTypeDto } from '@shared/dto';

@Injectable()
export class AssetTypeService {
  constructor(private readonly assettypeRepository: AssetTypeRepository) {}

  async addAssetType(payload: AddAssetTypeDto) {
    try {
      const res = await this.assettypeRepository.create({ ...payload });
      return successResponse(HttpStatus.CREATED, 'Success', res);
    } catch (error) {
      return errorResponse(HttpStatus.BAD_REQUEST, 'Bad Request', error?.name);
    }
  }
}
