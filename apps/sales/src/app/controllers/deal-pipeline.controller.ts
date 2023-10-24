import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RMQ_MESSAGES } from '@shared/constants';
import {
  CreateDealPipelineDto,
  DeleteDealPipelineDto,
  UpdateDealPipelineDto,
  GetDealPipelinesDto,
  IdDto,
} from '@shared/dto';
import { DealPipelineService } from '../services/deal-pipeline.service';

@Controller()
export class DealPipelineController {
  constructor(
    private readonly dealPipelineService: DealPipelineService
  ) {}

  @MessagePattern(RMQ_MESSAGES.DEAL_PIPELINE.CREATE_DEAL_PIPELINE)
  async addDealPipeline(@Payload() payload: CreateDealPipelineDto) {
    return this.dealPipelineService.createDealPipeline(payload);
  }

  @MessagePattern(RMQ_MESSAGES.DEAL_PIPELINE.GET_DEAL_PIPELINES)
  async getDealPipelines(@Payload() payload: GetDealPipelinesDto) {
    return this.dealPipelineService.getDealPipelines(payload);
  }

  @MessagePattern(RMQ_MESSAGES.DEAL_PIPELINE.GET_DEAL_PIPELINE)
  async getDealPipeline(@Payload() payload: IdDto) {
    return this.dealPipelineService.getDealPipeline(payload);
  }

  @MessagePattern(RMQ_MESSAGES.DEAL_PIPELINE.UPDATE_DEAL_PIPELINE)
  async updateDealPipeline(@Payload() payload: UpdateDealPipelineDto) {
    return this.dealPipelineService.updateDealPipeline(payload);
  }

  @MessagePattern(
    RMQ_MESSAGES.DEAL_PIPELINE.DELETE_DEAL_PIPELINE
  )
  async deleteDealPipeline(@Payload() payload: DeleteDealPipelineDto) {
    return this.dealPipelineService.deleteDealPipeline(payload);
  }
}
