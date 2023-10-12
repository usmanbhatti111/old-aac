import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RMQ_MESSAGES } from '@shared/constants';
import { PlanService } from '../services/plan.services';
import {
  AddPlanDto,
  EditPlanDto,
  PlanDeleteDto,
  PlanFilterDto,
} from '@shared/dto';

@Controller()
export class PlanController {
  constructor(private readonly planService: PlanService) {}

  @MessagePattern(RMQ_MESSAGES.PLAN.ADD_PLAN)
  addPlan(@Payload() payload: AddPlanDto) {
    return this.planService.addPlan(payload);
  }

  @MessagePattern(RMQ_MESSAGES.PLAN.PLAN_LIST)
  getPlans(@Payload() payload: PlanFilterDto) {
    return this.planService.getPlans(payload);
  }

  @MessagePattern(RMQ_MESSAGES.PLAN.PLAN)
  getPlan(@Payload() payload: string) {
    return this.planService.getPlan(payload);
  }

  @MessagePattern(RMQ_MESSAGES.PLAN.EDIT_PLAN)
  editPlan(@Payload() payload: EditPlanDto) {
    return this.planService.editPlan(payload);
  }

  @MessagePattern(RMQ_MESSAGES.PLAN.DELETE_PLAN)
  deletePlan(@Payload() payload: PlanDeleteDto) {
    return this.planService.deletePlan(payload);
  }
}
