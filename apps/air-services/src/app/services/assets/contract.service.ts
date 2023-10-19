import { HttpStatus, Injectable } from '@nestjs/common';
import { EContractExpiry } from '@shared/constants';
import { successResponse } from '@shared/constants';
import { ContractRepository } from '@shared';
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
        expiryFilter = this.getExpiryFilter(expiry);
        pipeline.push({ $match: { endDate: expiryFilter } });
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

  getExpiryFilter(filter: string) {
    const today = dayjs();
    switch (filter) {
      case EContractExpiry.TODAY:
        return {
          $lte: today.endOf('day').toDate(),
          $gte: today.startOf('day').toDate(),
        };
      case EContractExpiry.YESTERDAY:
        return {
          $lte: today.startOf('day').subtract(1, 'day').endOf('day').toDate(),
          $gte: today.startOf('day').subtract(1, 'day').startOf('day').toDate(),
        };
      case EContractExpiry.PREVIOUS_WEEK:
        return {
          $lte: today.startOf('day').subtract(1, 'week').endOf('week').toDate(),
          $gte: today
            .startOf('day')
            .subtract(1, 'week')
            .startOf('week')
            .toDate(),
        };
      case EContractExpiry.PREVIOUS_MONTH:
        return {
          $lte: today
            .startOf('month')
            .subtract(1, 'month')
            .endOf('month')
            .toDate(),
          $gte: today
            .startOf('month')
            .subtract(1, 'month')
            .startOf('month')
            .toDate(),
        };
      case EContractExpiry.NEXT_WEEK:
        return {
          $lte: today.endOf('week').add(1, 'week').endOf('week').toDate(),
          $gte: today.endOf('week').add(1, 'week').startOf('week').toDate(),
        };
      case EContractExpiry.NEXT_MONTH:
        return {
          $lte: today.endOf('month').add(1, 'month').endOf('month').toDate(),
          $gte: today.endOf('month').add(1, 'month').startOf('month').toDate(),
        };
      default:
        return {};
    }
  }
}
