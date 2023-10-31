import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RMQ_MESSAGES } from '@shared/constants';
import { CreateDealDto, DealAssociationDto, GetDealsListViewDto, IdDto, UpdateDealDto } from '@shared/dto';
import { DealsService } from '../services/deals.service';

@Controller()
export class DealsController {
  constructor(private readonly dealsService: DealsService) {}

  @MessagePattern(RMQ_MESSAGES.SALES.DEALS.CREATE_DEAL)
  async createDeal(@Payload() payload: CreateDealDto) {
    return this.dealsService.createDeal(payload);
  }

  @MessagePattern(RMQ_MESSAGES.SALES.DEALS.UPDATE_DEAL)
  async updateDeal(@Payload() payload: UpdateDealDto) {
    return this.dealsService.updateDeal(payload);
  }

  @MessagePattern(RMQ_MESSAGES.SALES.DEALS.GET_DEALS_LIST_VIEW)
  async getDealsListVew(@Payload() payload: GetDealsListViewDto) {
    return this.dealsService.getDealsListVew(payload);
  }

  @MessagePattern(RMQ_MESSAGES.SALES.DEALS.CREATE_ASSOCIATION)
  async associateDeal(@Payload() payload: DealAssociationDto) {
    return this.dealsService.associateDeal(payload);
  }

  @MessagePattern(RMQ_MESSAGES.SALES.DEALS.DELETE_ASSOCIATION)
  async disassociateDeal(@Payload() payload: DealAssociationDto) {
    return this.dealsService.disassociateDeal(payload);
  }

  @MessagePattern(RMQ_MESSAGES.SALES.DEALS.GET_ASSOCIATIONS)
  async populateAssociations(@Payload() payload: IdDto) {
    return this.dealsService.populateAssociations(payload);
  }
}
