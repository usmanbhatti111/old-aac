import { HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { DealPipelineRepository } from '@shared';
import { ResponseMessage, successResponse } from '@shared/constants';
import {
  CreateDealPipelineDto,
  DeleteDealPipelineDto,
  UpdateDealPipelineDto,
  GetDealPipelinesDto,
  IdDto,
} from '@shared/dto';

@Injectable()
export class DealPipelineService {
  constructor(private dealPipelineRepository: DealPipelineRepository) {}

  async createDealPipeline(payload: CreateDealPipelineDto) {
    try {
      const res = await this.dealPipelineRepository.create(payload);
      return successResponse(HttpStatus.CREATED, ResponseMessage.CREATED, res);
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async getDealPipelines(payload: GetDealPipelinesDto) {
    try {
      const { search } = payload;

      const filterQuery = { isDeleted: false };

      if (search) {
        filterQuery['$or'] = [
          {
            name: { $regex: search, $options: 'i' },
          },
        ];
      }

      let { limit, page } = payload;
      limit = limit ? limit : 10;
      page = page ? page : 1;
      const offset = limit * (page - 1);

      const res = await this.dealPipelineRepository.paginate({
        filterQuery,
        offset,
        limit,
      });

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

  async getDealPipeline(payload: IdDto) {
    try {
      const { id } = payload;

      const filter = { _id: id };

      const res = await this.dealPipelineRepository.findOne(filter);

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

  async updateDealPipeline(payload: UpdateDealPipelineDto) {
    try {
      const { id } = payload;

      const filter = { _id: id };

      const res = await this.dealPipelineRepository.findOneAndUpdate(
        filter,
        payload
      );

      return successResponse(HttpStatus.OK, ResponseMessage.SUCCESS, res);
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async deleteDealPipeline(payload: DeleteDealPipelineDto) {
    try {
      const { id, deletedBy } = payload;

      const filter = { _id: id };

      const data = { isDeleted: true, deletedBy };

      await this.dealPipelineRepository.findOneAndUpdate(filter, data);

      return successResponse(HttpStatus.OK, ResponseMessage.SUCCESS, {});
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
