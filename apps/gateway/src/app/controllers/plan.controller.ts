import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  API_ENDPOINTS,
  API_TAGS,
  CONTROLLERS,
  RMQ_MESSAGES,
  SERVICES,
} from '@shared/constants';
import { AddPlanDto } from '@shared/dto';
import { Response } from 'express';
import { firstValueFrom } from 'rxjs';

@ApiTags(API_TAGS.PLAN)
@Controller(CONTROLLERS.PLAN)
@ApiBearerAuth()
export class PlanController {
  constructor(
    @Inject(SERVICES.SUPER_ADMIN) private superAdminServiceClient: ClientProxy
  ) {}

  @Post(API_ENDPOINTS.PLAN.ADDPLAN)
  public async createPlan(
    @Body() payload: AddPlanDto,
    @Res() res: Response | any
  ) {
    const response = await firstValueFrom(
      this.superAdminServiceClient.send(RMQ_MESSAGES.PLAN.ADDPLAN, payload)
    );
    return res.status(response.statusCode).json(response);
  }

  @Get(RMQ_MESSAGES.PLAN.PLANLIST)
  public async getPlans(
    @Query() payload: AddPlanDto,
    @Res() res: Response | any
  ) {
    const response = await firstValueFrom(
      this.superAdminServiceClient.send(RMQ_MESSAGES.PLAN.ADDPLAN, payload)
    );
    return res.status(response.statusCode).json(response);
  }
}
