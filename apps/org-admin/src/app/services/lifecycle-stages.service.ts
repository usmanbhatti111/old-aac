import { HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { LifecycleStagesRepository } from '@shared';
import { ResponseMessage, successResponse } from '@shared/constants';
import {
  AddLifecycleStageDto,
  DeleteLifecycleStageDto,
  EditLifecycleStageDto,
  GetLifecycleStagesDto,
  IdDto,
} from '@shared/dto';

import mongoose from 'mongoose';

@Injectable()
export class LifecycleStagesService {
  constructor(private lifecycleStagesRepository: LifecycleStagesRepository) {}

  async addLifecycleStage(payload: AddLifecycleStageDto) {
    try {
      const res = await this.lifecycleStagesRepository.create(payload);
      return successResponse(HttpStatus.CREATED, ResponseMessage.CREATED, res);
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async getLifecycleStages(payload: GetLifecycleStagesDto) {
    try {
      const { search, userId } = payload;

      const filterQuery = { isDeleted: false };

      // get lifecycle stages related to specific organization
      if (userId) {
        filterQuery['createdBy'] = new mongoose.Types.ObjectId(userId);
      }

      if (search) {
        filterQuery['$or'] = [
          {
            name: { $regex: search, $options: 'i' },
            description: { $regex: search, $options: 'i' },
          },
        ];
      }

      const limit = payload?.limit || 10;
      const offset = payload?.page || 1;

      const res = await this.lifecycleStagesRepository.paginate({
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

  async getLifecycleStage(payload: IdDto) {
    try {
      const { id } = payload;

      const filter = { _id: id };

      const res = await this.lifecycleStagesRepository.findOne(filter);

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

  async editLifecycleStage(payload: EditLifecycleStageDto) {
    try {
      const { id } = payload;

      const filter = { _id: id };

      const res = await this.lifecycleStagesRepository.findOneAndUpdate(
        filter,
        payload
      );

      return successResponse(HttpStatus.OK, ResponseMessage.SUCCESS, res);
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async deleteLifecycleStage(payload: DeleteLifecycleStageDto) {
    try {
      const { id, deletedBy } = payload;

      const filter = { _id: id };

      const data = { isDeleted: true, deletedBy };

      await this.lifecycleStagesRepository.findOneAndUpdate(filter, data);

      return successResponse(HttpStatus.OK, ResponseMessage.SUCCESS, {});
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
