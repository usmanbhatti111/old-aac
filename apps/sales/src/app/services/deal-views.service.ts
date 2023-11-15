import { HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { DealViewsRepository } from '@shared';
import {
  EDealViewSharedWith,
  EIsDeletedStatus,
  ResponseMessage,
  successResponse,
} from '@shared/constants';
import { CreateDealViewDto, GetDealViewsDto } from '@shared/dto';

@Injectable()
export class DealViewsService {
  constructor(private dealViewsRepository: DealViewsRepository) {}

  async createDealView(payload: CreateDealViewDto) {
    try {
      const res = await this.dealViewsRepository.create(payload);

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

  async getDealViews(payload: GetDealViewsDto) {
    try {
      const filterQuery = { isDeleted: EIsDeletedStatus.ACTIVE };

      // TODO: ADD Find User Team Logic When Create Team Functionality is done
      const teamIds = [];

      filterQuery['$or'] = [
        { createdBy: payload?.userId, sharedWith: EDealViewSharedWith.PRIVATE },
        { teamId: { $in: teamIds }, sharedWith: EDealViewSharedWith.MY_TEAM },
        { sharedWith: EDealViewSharedWith.EVERYONE },
      ];

      const res = await this.dealViewsRepository.find(filterQuery);

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
