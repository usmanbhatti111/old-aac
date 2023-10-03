import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RMQ_MESSAGES } from '@shared/constants';
import { PlanService } from '../services/plan.services';
import { AddPlanDto, PaginationDto } from '@shared/dto';

@Controller()
export class PlanController {
  constructor(private readonly planService: PlanService) {}

  @MessagePattern(RMQ_MESSAGES.PLAN.ADDPLAN)
  addPlan(@Payload() payload: AddPlanDto) {
    console.log('START');
    return this.planService.addPlan(payload);
  }

  @MessagePattern(RMQ_MESSAGES.PLAN.PLANLIST)
  getPlans(@Payload() payload: PaginationDto) {
    console.log('START');
    return this.planService.getPlans(payload);
  }
}
