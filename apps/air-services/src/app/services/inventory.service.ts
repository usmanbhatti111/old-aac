import { HttpStatus, Injectable } from '@nestjs/common';
import { MODEL, errorResponse, successResponse } from '@shared/constants';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class InventoryService {
  constructor(
    @InjectModel(MODEL.ASSETS) private readonly assetModel: Model<any>
  ) {}

  async addAssets(payload: any) {
    try {
      const res = await this.assetModel.create({ ...payload });
      return successResponse(HttpStatus.CREATED, 'Success', res);
    } catch (error) {
      return errorResponse(HttpStatus.BAD_REQUEST, 'Bad Request', error?.name);
    }
  }
  async getAssets() {
    try {
      const res = await this.assetModel.find()
      return successResponse(HttpStatus.CREATED, 'Success', res);
    } catch (error) {
      return errorResponse(HttpStatus.BAD_REQUEST, 'Bad Request', error?.name);
    }
  }
}
