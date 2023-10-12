import { HttpStatus, Injectable } from '@nestjs/common';
import { errorResponse, successResponse } from '@shared/constants';
import { PurchaseRepository } from '@shared';
import {
  DeletePurchaseDto,
  UpdatePurchaseDto,
  AddPurchaseDto,
} from '@shared/dto';

@Injectable()
export class PurchaseService {
  constructor(private purchaseRepository: PurchaseRepository) {}
  async addPurchase(payload: AddPurchaseDto) {
    try {
      const res = await this.purchaseRepository.create({ ...payload });
      return successResponse(HttpStatus.CREATED, 'Success', res);
    } catch (error) {
      return errorResponse(HttpStatus.BAD_REQUEST, 'Bad Request', error?.name);
    }
  }
  async deletePurchase(payload: DeletePurchaseDto) {
    try {
      const { id } = payload;
      const res = await this.purchaseRepository.delete({ _id: id });

      return successResponse(HttpStatus.OK, 'Success', res);
    } catch (error) {
      return errorResponse(HttpStatus.BAD_REQUEST, 'Bad Request', error?.name);
    }
  }
  async updatePurchase(payload: UpdatePurchaseDto) {
    try {
      const { id } = payload;
      delete payload.id;
      const res = await this.purchaseRepository.findOneAndUpdate(
        { _id: id },
        payload
      );
      return successResponse(HttpStatus.OK, 'Success', res);
    } catch (error) {
      return errorResponse(HttpStatus.BAD_REQUEST, 'Bad Request', error?.name);
    }
  }
}
