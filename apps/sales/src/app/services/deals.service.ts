import { HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { DealsRepository } from '@shared';
import { ResponseMessage, successResponse } from '@shared/constants';
import { CreateDealDto } from '@shared/dto';

@Injectable()
export class DealsService {
  constructor(private dealsRepository: DealsRepository) {}

  async createDeal(payload: CreateDealDto) {
    try {
      const res = await this.dealsRepository.create(payload);

      const response = successResponse(
        HttpStatus.CREATED,
        ResponseMessage.SUCCESS,
        res
      );

      return response;
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
