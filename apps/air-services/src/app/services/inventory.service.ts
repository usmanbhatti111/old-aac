import { HttpStatus, Injectable } from '@nestjs/common';
import { errorResponse, successResponse } from '@shared/constants';
import { AssetRepository } from '@shared';

@Injectable()
export class InventoryService {
  constructor(private assetRepository: AssetRepository) {}

  async addAssets(payload: any) {
    try {
      const res = await this.assetRepository.create({ ...payload });
      return successResponse(HttpStatus.CREATED, 'Success', res);
    } catch (error) {
      return errorResponse(HttpStatus.BAD_REQUEST, 'Bad Request', error?.name);
    }
  }
  async getAssets() {
    try {
      const res = await this.assetRepository.find();
      return successResponse(HttpStatus.CREATED, 'Success', res);
    } catch (error) {
      return errorResponse(HttpStatus.BAD_REQUEST, 'Bad Request', error?.name);
    }
  }
}
