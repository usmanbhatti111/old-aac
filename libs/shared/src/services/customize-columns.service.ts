import { HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { CustomizeColumnsRepository } from '@shared';
import { ResponseMessage, successResponse } from '@shared/constants';
import { CreateCustomizeColumnDto } from '@shared/dto';

@Injectable()
export class CustomizeColumnsService {
  constructor(
    private readonly customizeColumnsRepository: CustomizeColumnsRepository
  ) {}

  async createCustomizeColumns(payload: CreateCustomizeColumnDto) {
    try {
      const filterQuery = {
        isDeleted: false,
        type: payload?.type,
        userId: payload?.userId ? payload?.userId : null,
      };

      const res = await this.customizeColumnsRepository.upsert(
        filterQuery,
        payload
      );

      const response = successResponse(
        HttpStatus.CREATED,
        ResponseMessage.CREATED,
        res
      );

      return response;
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
