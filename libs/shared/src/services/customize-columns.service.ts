import { HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { CustomizeColumnsRepository } from '../repositories/common-feature/customize-columns.repositorty';
import { ResponseMessage, successResponse } from '@shared/constants';
import { CreateCustomizeColumnDto, GetCustomizedColumns } from '@shared/dto';

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
        HttpStatus.OK,
        ResponseMessage.SUCCESS,
        res
      );
      return response;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async getCustomizedColumns(payload: GetCustomizedColumns) {
    try {
      const filterQuery = {
        isDeleted: false,
        type: payload?.type,
        userId: payload?.userId,
      };

      let res = await this.customizeColumnsRepository.findOneWithoutException(
        filterQuery
      );

      if (!res) {
        filterQuery.userId = null;
        res = await this.customizeColumnsRepository.findOne(filterQuery);
      }

      return successResponse(HttpStatus.OK, ResponseMessage.SUCCESS, res);
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
