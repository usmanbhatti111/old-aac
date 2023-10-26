import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RMQ_MESSAGES } from '@shared/constants';
import { CreateDealDto } from '@shared/dto';
import { DealsService } from '../services/deals.service';

@Controller()
export class DealsController {
  constructor(private readonly dealsService: DealsService) {}

  @MessagePattern(RMQ_MESSAGES.SALES.DEALS.CREATE_DEAL)
  async addLifecycleStage(@Payload() payload: CreateDealDto) {
    return this.dealsService.createDeal(payload);
  }
}
