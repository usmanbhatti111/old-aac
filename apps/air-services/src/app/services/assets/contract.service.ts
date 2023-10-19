import { HttpStatus, Injectable } from '@nestjs/common';
import { EContractExpiry } from '@shared/constants';
import { successResponse } from '@shared/constants';
import { ContractRepository, mongooseDateFilter } from '@shared';
import { RpcException } from '@nestjs/microservices';
import { GetContactsDto } from '@shared/dto';
import dayjs from 'dayjs';

@Injectable()
export class ContractService {
  constructor(private contractRepository: ContractRepository) {}

  async addContract(payload: any) {
    try {
      const res = await this.contractRepository.create({ ...payload });
      return successResponse(HttpStatus.CREATED, 'Success', res);
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async getContracts(payload: GetContactsDto) {
    try {
      const { page, limit, status, search, expiry } = payload;
      let filterQuery = {};
      let searchFilter = {};
      let expiryFilter = {};
      const pipeline = [];

      if (status) {
        filterQuery['status'] = status;
      }
      if (search) {
        searchFilter['$or'] = [
          { name: { $regex: search, $options: 'i' } },
          { contractNumber: { $regex: search, $options: 'i' } },
          { status: { $regex: search, $options: 'i' } },
          { cost: { $regex: search, $options: 'i' } },
        ];
        pipeline.push({ $match: searchFilter });
      }
      if (expiry) {
        expiryFilter = mongooseDateFilter(expiry, 'endDate');
        pipeline.push({ $match: expiryFilter });
      }
      const response = await this.contractRepository.newPaginate(
        filterQuery,
        pipeline,
        {
          page,
          limit,
        }
      );

      return successResponse(HttpStatus.CREATED, 'Success', response);
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
