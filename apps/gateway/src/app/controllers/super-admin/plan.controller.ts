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
  Req,
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
  AddPlanTypeDto,
  AddPlanTypeResponseDto,
  EditPlanDto,
  EditPlanResponseDto,
  GetPlanResponseDto,
  GetPlansResponseDto,
  GetPlansTypeResponseDto,
  PlanFilterDto,
  PlanIdParamDto,
  PlanProductParamDto,
  PostResponseDto,
} from '@shared/dto';
import { firstValueFrom } from 'rxjs';
import { Auth } from '../../decorators/auth.decorator';
import { AppRequest } from '../../shared/interface/request.interface';

@ApiTags(API_TAGS.PLAN)
@Controller(CONTROLLERS.PLAN)
@ApiBearerAuth()
export class PlanController {
  constructor(
    @Inject(SERVICES.SUPER_ADMIN) private superAdminServiceClient: ClientProxy
  ) {}

  @Auth(true)
  @Get(API_ENDPOINTS.PLAN.PRODUCT_PLAN_LIST)
  @ApiOkResponse({ type: GetPlansResponseDto })
  public async getProductPlans(
    @Param() payload: PlanProductParamDto
  ): Promise<GetPlansResponseDto> {
    const response = await firstValueFrom(
      this.superAdminServiceClient.send(
        RMQ_MESSAGES.PLAN.PRODUCT_PLAN_LIST,
        payload
      )
    );
    return response;
  }

  @Auth(true)
  @Post(API_ENDPOINTS.PLAN.ADD_PLAN_TYPE)
  @ApiCreatedResponse({ type: AddPlanTypeResponseDto })
  public async createPlanType(
    @Body() payload: AddPlanTypeDto,
    @Req() req: AppRequest
  ): Promise<PostResponseDto<Plan>> {
    payload.createdBy = req.user._id;
    const response = await firstValueFrom(
      this.superAdminServiceClient.send(
        RMQ_MESSAGES.PLAN.ADD_PLAN_TYPE,
        payload
      )
    );
    return response;
  }

  @Auth(true)
  @Post(API_ENDPOINTS.PLAN.ADD_PLAN)
  @ApiCreatedResponse({ type: AddPlanResponseDto })
  public async createPlan(
    @Body() payload: AddPlanDto,
    @Req() req: AppRequest
  ): Promise<PostResponseDto<Plan>> {
    payload.createdBy = req.user._id;
    const response = await firstValueFrom(
      this.superAdminServiceClient.send(RMQ_MESSAGES.PLAN.ADD_PLAN, payload)
    );
    return response;
  }

  @Auth(true)
  @Get(API_ENDPOINTS.PLAN.PLAN_LIST)
  @ApiOkResponse({ type: GetPlansResponseDto })
  public async getPlans(
    @Query() payload: PlanFilterDto
  ): Promise<GetPlansResponseDto> {
    const response = await firstValueFrom(
      this.superAdminServiceClient.send(RMQ_MESSAGES.PLAN.PLAN_LIST, payload)
    );
    return response;
  }

  @Auth(true)
  @Get(API_ENDPOINTS.PLAN.PLAN_TYPE_LIST)
  @ApiOkResponse({ type: GetPlansTypeResponseDto })
  public async getPlanTypeList(): Promise<GetPlansTypeResponseDto> {
    const response = await firstValueFrom(
      this.superAdminServiceClient.send(RMQ_MESSAGES.PLAN.PLAN_TYPE_LIST, {})
    );
    return response;
  }

  @Auth(true)
  @Get(API_ENDPOINTS.PLAN.PLAN)
  @ApiOkResponse({ type: GetPlanResponseDto })
  public async getPlan(
    @Param() { planId }: PlanIdParamDto
  ): Promise<GetPlanResponseDto> {
    const response = await firstValueFrom(
      this.superAdminServiceClient.send(RMQ_MESSAGES.PLAN.PLAN, planId)
    );
    return response;
  }

  @Auth(true)
  @Delete(API_ENDPOINTS.PLAN.DELETE_PLAN)
  @ApiOkResponse({ type: PostResponseDto })
  public async deletePlan(
    @Param() { planId }: PlanIdParamDto,
    @Req() req: AppRequest
  ): Promise<PostResponseDto<Plan>> {
    const deletedBy = req.user._id;
    const response = await firstValueFrom(
      this.superAdminServiceClient.send(RMQ_MESSAGES.PLAN.DELETE_PLAN, {
        planId,
        deletedBy,
      })
    );
    return response.statusCode;
  }

  @Auth(true)
  @Patch(API_ENDPOINTS.PLAN.EDIT_PLAN)
  @ApiCreatedResponse({ type: EditPlanResponseDto })
  public async updatePlan(
    @Param() { planId }: PlanIdParamDto,
    @Body() payload: EditPlanDto,
    @Req() req: AppRequest
  ): Promise<PostResponseDto<Plan>> {
    payload.planId = planId;
    payload.updatedBy = req.user._id;
    const response = await firstValueFrom(
      this.superAdminServiceClient.send(RMQ_MESSAGES.PLAN.EDIT_PLAN, payload)
    );
    return response;
  }
}
