import { HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { DealsRepository, LifecycleStagesRepository } from '@shared';
import {
  EDealProbabilityStage,
  ResponseMessage,
  successResponse,
} from '@shared/constants';
import { CreateDealDto, GetDealsListViewDto, UpdateDealDto } from '@shared/dto';

@Injectable()
export class DealsService {
  constructor(
    private dealsRepository: DealsRepository,
    private readonly lifecycleStagesRepository: LifecycleStagesRepository
  ) {}

  async createDeal(payload: CreateDealDto) {
    try {
      // get deal winning probabilty according to deal stage
      if (payload?.dealStageId) {
        const filter = { _id: payload.dealStageId };
        const lifecycleStage = await this.lifecycleStagesRepository.findOne(
          filter
        );

        const stage = lifecycleStage?.name?.toUpperCase();

        if (Object.keys(EDealProbabilityStage).includes(stage)) {
          payload.probability = EDealProbabilityStage[stage];
        }
      }

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

  async updateDeal(payload: UpdateDealDto) {
    try {
      const { id, updatedBy } = payload;

      // get deal winning probabilty according to deal stage
      if (payload?.dealStageId) {
        const filter = { _id: payload.dealStageId };
        const lifecycleStage = await this.lifecycleStagesRepository.findOne(
          filter
        );

        const stage = lifecycleStage?.name?.toUpperCase();

        if (Object.keys(EDealProbabilityStage).includes(stage)) {
          payload.probability = EDealProbabilityStage[stage];
        }
      }

      const filter = { _id: id, isDeleted: false, createdBy: updatedBy };

      const res = await this.dealsRepository.findOneAndUpdate(filter, payload);

      return successResponse(HttpStatus.OK, ResponseMessage.SUCCESS, res);
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async getDealsListVew(payload: GetDealsListViewDto) {
    try {
      const { userId } = payload;

      const filterQuery = { isDeleted: false, createdBy: userId };

      const limit = payload?.limit ? payload.limit : 10;
      const offset = payload?.page ? payload.page : 1;

      const res = await this.dealsRepository.paginate({
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
}
