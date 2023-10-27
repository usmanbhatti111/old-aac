import { HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { DealPipelineRepository, LifecycleStagesRepository } from '@shared';
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
  constructor(private dealPipelineRepository: DealPipelineRepository,
    private stagesRepository: LifecycleStagesRepository) {}

  async createDealPipeline(payload: CreateDealPipelineDto) {
    try {
       //add stages and saves their ids in deal pipeline
       const stages = payload.dealStages;
       delete payload.dealStages;
 
       const stageIds: string[] = [];
       for (const stage of stages) {
         const createdStage = await this.stagesRepository.create(stage);
         stageIds.push(createdStage._id.toString());
       }
       payload.stages = stageIds;
 
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
      const pipelines: any = [
        {
          $lookup: {
            from: 'lifecycleStages',
            localField: 'stages',
            foreignField: '_id',
            as: 'stages',
          },
        },
      ];
      const res = await this.dealPipelineRepository.paginate({
        filterQuery,
        offset,
        limit,
        pipelines,
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
      const stages = payload.dealStages;
      delete payload.dealStages;

      const stageIds: string[] = [];
      for (const stage of stages) {
        if (stage.id) {
          //if id exists then update
          const createdStage = await this.stagesRepository.findOneAndUpdate(
            { _id: stage.id },
            stage
          );
          stageIds.push(createdStage._id.toString());
        } else {
          const createdStage = await this.stagesRepository.create(stage);
          stageIds.push(createdStage._id.toString());
        }
      }
      //delete the stages
      const pipelineRes = await this.dealPipelineRepository.findOne(filter);
      if(pipelineRes && pipelineRes?.stages ){
        for(const stage of pipelineRes.stages){
          if(stage in stageIds){
            await this.stagesRepository.delete({_id:stage})
          }
        }
      }
      payload.stages = stageIds;
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
