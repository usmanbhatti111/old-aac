import {
  Body,
  Controller,
  Get,
  Inject,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import {
  API_ENDPOINTS,
  API_TAGS,
  CONTROLLERS,
  EActivityType,
  EActivitylogModule,
  RMQ_MESSAGES,
  SERVICES,
} from '@shared/constants';
import { firstValueFrom } from 'rxjs';
import { Auth } from '../../decorators/auth.decorator';
import { AppRequest } from '../../shared/interface/request.interface';
import {
  ActivityLogParams,
  AssignOrgPlanOrgAdminDto,
  AssignOrgPlanResponseDto,
  GetAllAssignPlanResponseDto,
  OrganizationPlanId,
  UpdateAssignOrgPlanOrgAdminDto,
  UpdateAssignOrgPlanResponseOrgAdminDto,
  getOneSubsDto,
} from '@shared/dto';

@ApiTags(API_TAGS.BILLING_INVOICES)
@Controller(CONTROLLERS.ORG_ADMIN.SUBSCRIPTIONS)
@ApiBearerAuth()
export class SubscriptionController {
  constructor(
    @Inject(SERVICES.ORG_ADMIN) private orgAdminServiceClient: ClientProxy,
    @Inject(SERVICES.COMMON_FEATURE) private commonFeatureClient: ClientProxy
  ) {}

  @Get()
  @Auth(true)
  @ApiCreatedResponse({ type: GetAllAssignPlanResponseDto })
  public async getAllSubscriptions(@Req() request: AppRequest) {
    const { user } = request;
    const organizationId = user?.organization;
    const payload = {};
    const response = await firstValueFrom(
      this.orgAdminServiceClient.send(
        { cmd: RMQ_MESSAGES.ORG_ADMIN.INVOICES.GET_ALL_SUBSCRIPTION },
        { ...payload, organizationId: organizationId }
      )
    );
    return response;
  }

  @Get(API_ENDPOINTS.ORG_ADMIN.SUBSCRIPTION.GET_ONE)
  @Auth(true)
  @ApiCreatedResponse({ type: GetAllAssignPlanResponseDto })
  public async getOneSubscription(
    @Query() orgPlanId: getOneSubsDto,
    @Req() request: AppRequest
  ) {
    const { user } = request;
    const organizationId = user?.organization;
    const payload = {};
    const response = await firstValueFrom(
      this.orgAdminServiceClient.send(
        { cmd: RMQ_MESSAGES.ORG_ADMIN.INVOICES.GET_ONE_SUBSCRIPTION },
        {
          ...payload,
          orgPlanId: orgPlanId.orgPlanId,
          organizationId: organizationId,
        }
      )
    );

    return response;
  }

  @Post()
  @Auth(true)
  @ApiCreatedResponse({ type: AssignOrgPlanResponseDto })
  public async assignPlan(
    @Body() payload: AssignOrgPlanOrgAdminDto,
    @Req() request: AppRequest
  ) {
    const { user } = request;
    const organizationId = user?.organization;
    const response = await firstValueFrom(
      this.orgAdminServiceClient.send(
        { cmd: RMQ_MESSAGES.ORG_ADMIN.INVOICES.ASSIGN_PLAN },
        { ...payload, organizationId: organizationId, assignedBy: user._id }
      )
    );

    //ActivityLog
    if (response?.data) {
      const params: ActivityLogParams = {
        organizationId: organizationId,
        performedBy: user?._id, // userId
        activityType: EActivityType.CREATED, // UPDATED
        module: EActivitylogModule.ORGANIZATION_PLAN, // module
        moduleId: response?.data?._id, // module._id
        moduleName: response?.data?.name || 'Subscription', //module.name
      };
      firstValueFrom(
        this.commonFeatureClient.emit(RMQ_MESSAGES.ACTIVITY_LOG.ACTIVITY_LOG, {
          ...params,
        })
      );
      response.data.activity = true;
    }
    return response;
  }

  @Patch()
  @Auth(true)
  @ApiCreatedResponse({ type: UpdateAssignOrgPlanResponseOrgAdminDto })
  public async updateAssignPlan(
    @Query() organizationPlanId: OrganizationPlanId,
    @Body() payload: UpdateAssignOrgPlanOrgAdminDto,
    @Req() request: AppRequest
  ) {
    const { user } = request;
    const organizationId = user?.organization;
    const response = await firstValueFrom(
      this.orgAdminServiceClient.send(
        { cmd: RMQ_MESSAGES.ORG_ADMIN.INVOICES.UPDATE_ASSIGN_PLAN },
        {
          ...payload,
          organizationPlanId: organizationPlanId.organizationPlanId,
          organizationId: organizationId,
          assignedBy: user._id,
        }
      )
    );

    //ActivityLog
    if (response?.data) {
      const params: ActivityLogParams = {
        organizationId: organizationId,
        performedBy: user?._id, // userId
        activityType: EActivityType.UPDATED, // UPDATED
        module: EActivitylogModule.ORGANIZATION_PLAN, // module
        moduleId: response?.data?._id, // module._id
        moduleName: response?.data?.name || 'Subscription', //module.name
      };
      firstValueFrom(
        this.commonFeatureClient.emit(RMQ_MESSAGES.ACTIVITY_LOG.ACTIVITY_LOG, {
          ...params,
        })
      );
      response.data.activity = true;
    }
    return response;
  }
}
