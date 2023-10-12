import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
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
import { Plan } from '@shared';
import {
  API_ENDPOINTS,
  API_TAGS,
  CONTROLLERS,
  RMQ_MESSAGES,
  SERVICES,
} from '@shared/constants';
import {
  AddPlanDto,
  AddPlanResponseDto,
  EditPlanDto,
  EditPlanResponseDto,
  GetPlanResponseDto,
  GetPlansResponseDto,
  PlanFilterDto,
  PlanIdParamDto,
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
  @ApiCreatedResponse({ type: AddPlanResponseDto })
  public async createPlan(
    @Body() payload: AddPlanDto,
    @Res() res: Response | any
  ): Promise<PostResponseDto<Plan>> {
    payload.createdBy = '65262d9c3686b5e9a4fc4222'; // TODO: get Id from token
    const response = await firstValueFrom(
      this.superAdminServiceClient.send(RMQ_MESSAGES.PLAN.ADD_PLAN, payload)
    );
    return res.status(response.statusCode).json(response);
  }

  @Get(API_ENDPOINTS.PLAN.PLAN_LIST)
  @ApiOkResponse({ type: GetPlansResponseDto })
  public async getPlans(
    @Query() payload: PlanFilterDto,
    @Res() res: Response | any
  ): Promise<GetPlansResponseDto> {
    const response = await firstValueFrom(
      this.superAdminServiceClient.send(RMQ_MESSAGES.PLAN.PLAN_LIST, payload)
    );
    return res.status(response.statusCode).json(response);
  }

  @Get(API_ENDPOINTS.PLAN.PLAN)
  @ApiOkResponse({ type: GetPlanResponseDto })
  public async getPlan(
    @Param() { planId }: PlanIdParamDto,
    @Res() res: Response | any
  ): Promise<GetPlanResponseDto> {
    const response = await firstValueFrom(
      this.superAdminServiceClient.send(RMQ_MESSAGES.PLAN.PLAN, planId)
    );
    return res.status(response.statusCode).json(response);
  }

  @Delete(API_ENDPOINTS.PLAN.DELETE_PLAN)
  @ApiOkResponse({ type: PostResponseDto })
  public async deletePlan(
    @Param() { planId }: PlanIdParamDto,
    @Res() res: Response | any
  ): Promise<PostResponseDto<Plan>> {
    const deletedBy = '65262d9c3686b5e9a4fc4222'; // TODO: get Id from token
    const response = await firstValueFrom(
      this.superAdminServiceClient.send(RMQ_MESSAGES.PLAN.DELETE_PLAN, {
        planId,
        deletedBy,
      })
    );
    return res.status(response.statusCode).json(response);
  }

  @Patch(API_ENDPOINTS.PLAN.EDIT_PLAN)
  @ApiCreatedResponse({ type: EditPlanResponseDto })
  public async updatePlan(
    @Param() { planId }: PlanIdParamDto,
    @Body() payload: EditPlanDto,
    @Res() res: Response | any
  ): Promise<PostResponseDto<Plan>> {
    payload.planId = planId;
    payload.updatedBy = '65262d5f0d1b96adb427985b'; // TODO: get Id from token
    const response = await firstValueFrom(
      this.superAdminServiceClient.send(RMQ_MESSAGES.PLAN.EDIT_PLAN, payload)
    );
    return res.status(response.statusCode).json(response);
  }
}
