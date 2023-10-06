import {
  Body,
  Controller,
  Get,
  Inject,
  Patch,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  API_ENDPOINTS,
  API_TAGS,
  CONTROLLERS,
  RMQ_MESSAGES,
  SERVICES,
} from '@shared/constants';
import {
  AddPlanDto,
  EditPlanDto,
  GetPlansResponseDto,
  PaginationDto,
  PostResponseDto,
} from '@shared/dto';
import { Response } from 'express';
import { firstValueFrom } from 'rxjs';

@ApiTags(API_TAGS.PLAN)
@Controller(CONTROLLERS.PLAN)
@ApiBearerAuth()
export class PlanController {
  constructor(
    @Inject(SERVICES.SUPER_ADMIN) private superAdminServiceClient: ClientProxy
  ) {}

  @Post(API_ENDPOINTS.PLAN.ADD_PLAN)
  @ApiCreatedResponse({ type: PostResponseDto })
  public async createPlan(
    @Body() payload: AddPlanDto,
    @Res() res: Response | any
  ) {
    const response = await firstValueFrom(
      this.superAdminServiceClient.send(RMQ_MESSAGES.PLAN.ADD_PLAN, payload)
    );
    return res.status(response.statusCode).json(response);
  }

  @Get(API_ENDPOINTS.PLAN.PLAN_LIST)
  @ApiOkResponse({ type: GetPlansResponseDto })
  public async getPlans(
    @Query() payload: PaginationDto,
    @Res() res: Response | any
  ) {
    const response = await firstValueFrom(
      this.superAdminServiceClient.send(RMQ_MESSAGES.PLAN.PLAN_LIST, payload)
    );
    return res.status(response.statusCode).json(response);
  }

  @Patch(API_ENDPOINTS.PLAN.EDIT_PLAN)
  @ApiCreatedResponse({ type: PostResponseDto })
  public async updatePlan(
    @Body() payload: EditPlanDto,
    @Res() res: Response | any
  ) {
    const response = await firstValueFrom(
      this.superAdminServiceClient.send(RMQ_MESSAGES.PLAN.EDIT_PLAN, payload)
    );
    return res.status(response.statusCode).json(response);
  }
}
