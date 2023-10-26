import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RMQ_MESSAGES } from '@shared/constants';
import { CreateDealDto, UpdateDealDto } from '@shared/dto';
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
}
