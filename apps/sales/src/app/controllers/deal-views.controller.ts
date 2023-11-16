import { MessagePattern, Payload } from '@nestjs/microservices';

import { RMQ_MESSAGES } from '@shared/constants';
import { CreateDealViewDto, GetDealViewsDto } from '@shared/dto';
import { DealViewsService } from '../services/deal-views.service';
import { Controller } from '@nestjs/common';

@Controller()
export class DealViewsController {
  constructor(private readonly dealViewsService: DealViewsService) {}

  @MessagePattern(RMQ_MESSAGES.SALES.DEAL_VIEWS.CREATE_DEAL_VIEW)
  async createDealView(@Payload() payload: CreateDealViewDto) {
    return this.dealViewsService.createDealView(payload);
  }

  @MessagePattern(RMQ_MESSAGES.SALES.DEAL_VIEWS.GET_DEAL_VIEW)
  async getDealViews(@Payload() payload: GetDealViewsDto) {
    return this.dealViewsService.getDealViews(payload);
  }
}
