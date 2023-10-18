import { HttpStatus, Injectable } from '@nestjs/common';
import { errorResponse, successResponse } from '@shared/constants';
import { ContractRepository } from '@shared';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class ContractService {
  constructor(private contractRepository: ContractRepository) { }

  async addContract(payload: any) {
    try {
      const res = await this.contractRepository.create({ ...payload });
      return successResponse(HttpStatus.CREATED, 'Success', res);
    } catch (error) {
      throw new RpcException(error)
    }
  }
}
