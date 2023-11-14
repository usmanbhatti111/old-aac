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
import { ClientProxy, RpcException } from '@nestjs/microservices';
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
  EActivityType,
  EActivitylogModule,
  RMQ_MESSAGES,
  SERVICES,
} from '@shared/constants';
import {
  ActivityLogParams,
  AssignOrgPlanDto,
  AssignOrgPlanResponseDto,
  BillingDetailsDto,
  BillingDetailsResponseDto,
  CreateInvoiceDto,
  FindPlanDTO,
  FindPlanDTOResponseDto,
  GenerateInvoicesResponseDto,
  GetOrgPlanResponseDto,
  ListInvoicesDTO,
  ListInvoicesResponseDto,
  ListOrgPlan,
  ListOrgPlanResponseDto,
  OrganizationPlanId,
  UpdateAssignOrgPlanResponseSuperAdminDto,
  UpdateAssignOrgPlanSuperAdminDto,
  UpdateInvoiceDto,
  UpdateInvoiceIdDto,
} from '@shared/dto';
import { firstValueFrom } from 'rxjs';
import { Auth } from '../../decorators/auth.decorator';
import { AppRequest } from '../../shared/interface/request.interface';

@ApiTags(API_TAGS.BILLING_INVOICES)
@Controller(CONTROLLERS.SUPER_ADMIN)
@ApiBearerAuth()
export class InvoiceController {
  constructor(
    @Inject(SERVICES.SUPER_ADMIN) private superAdminServiceClient: ClientProxy,
    @Inject(SERVICES.COMMON_FEATURE) private commonFeatureClient: ClientProxy
  ) {}

  @Get(API_ENDPOINTS.SUPER_ADMIN.BILLING_INVOICES.ORG_PLANS)
  @Auth(true)
  @ApiOkResponse({ type: ListOrgPlanResponseDto })
  public async listOrgPlan(@Query() query: ListOrgPlan) {
    const response = await firstValueFrom(
      this.superAdminServiceClient.send(
        { cmd: RMQ_MESSAGES.SUPER_ADMIN.BILLING_INVOICES.LIST_ORG_PLAN },
        { ...query }
      )
    );

    return response;
  }

  @Get(API_ENDPOINTS.SUPER_ADMIN.BILLING_INVOICES.ORG_PLAN)
  @Auth(true)
  @ApiOkResponse({ type: GetOrgPlanResponseDto })
  public async getOrgPlan(
    @Query('organizationPlanId') organizationPlanId: string
  ) {
    const response = await firstValueFrom(
      this.superAdminServiceClient.send(
        { cmd: RMQ_MESSAGES.SUPER_ADMIN.BILLING_INVOICES.GET_ORG_PLAN },
        { organizationPlanId }
      )
    );

    return response;
  }

  @Get(API_ENDPOINTS.SUPER_ADMIN.BILLING_INVOICES.FIND_PLAN)
  @Auth(true)
  @ApiOkResponse({ type: FindPlanDTOResponseDto })
  public async findPlan(@Query() payload: FindPlanDTO) {
    const response = await firstValueFrom(
      this.superAdminServiceClient.send(
        { cmd: RMQ_MESSAGES.SUPER_ADMIN.BILLING_INVOICES.FIND_PLAN },
        { ...payload }
      )
    );
    return response;
  }

  @Post(API_ENDPOINTS.SUPER_ADMIN.BILLING_INVOICES.ASSIGN_PLAN)
  @Auth(true)
  @ApiCreatedResponse({ type: AssignOrgPlanResponseDto })
  public async assignPlan(
    @Body() payload: AssignOrgPlanDto,
    @Req() request: AppRequest
  ) {
    try {
      const { user } = request;
      const assignedBy = user?._id;
      const response = await firstValueFrom(
        this.superAdminServiceClient.send(
          { cmd: RMQ_MESSAGES.SUPER_ADMIN.BILLING_INVOICES.ASSIGN_PLAN },
          { ...payload, assignedBy }
        )
      );

      //ActivityLog
      if (response?.data) {
        const params: ActivityLogParams = {
          performedBy: user?._id, // userId
          activityType: EActivityType.CREATED, // UPDATED
          module: EActivitylogModule.ORGANIZATION_PLAN, // module
          moduleId: response?.data?._id, // module._id
          moduleName: response?.data?.name || 'Subscription', //module.name
        };
        firstValueFrom(
          this.commonFeatureClient.emit(
            RMQ_MESSAGES.ACTIVITY_LOG.ACTIVITY_LOG,
            {
              ...params,
            }
          )
        );
        response.data.activity = true;
      }

      return response;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Patch(API_ENDPOINTS.SUPER_ADMIN.BILLING_INVOICES.UPDATE_ASSIGN_PLAN)
  @Auth(true)
  @ApiCreatedResponse({ type: UpdateAssignOrgPlanResponseSuperAdminDto })
  public async updateAssignPlan(
    @Query() organizationPlanId: OrganizationPlanId,
    @Body() payload: UpdateAssignOrgPlanSuperAdminDto,
    @Req() request: AppRequest
  ) {
    const { user } = request;
    const response = await firstValueFrom(
      this.superAdminServiceClient.send(
        { cmd: RMQ_MESSAGES.SUPER_ADMIN.BILLING_INVOICES.UPDATE_ASSIGN_PLAN },
        {
          ...payload,
          organizationPlanId: organizationPlanId.organizationPlanId,
          userId: user._id,
        }
      )
    );

    //ActivityLog
    if (response?.data) {
      const params: ActivityLogParams = {
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

  @Auth(true)
  @Get(API_ENDPOINTS.SUPER_ADMIN.BILLING_INVOICES.LIST_ALL_INVOICE)
  @ApiCreatedResponse({ type: ListInvoicesResponseDto })
  public async getAllInvoices(@Query() payload: ListInvoicesDTO) {
    const response = await firstValueFrom(
      this.superAdminServiceClient.send(
        { cmd: RMQ_MESSAGES.SUPER_ADMIN.BILLING_INVOICES.LIST_ALL_INVOICES },
        { ...payload }
      )
    );
    return response;
  }

  @Post(API_ENDPOINTS.SUPER_ADMIN.BILLING_INVOICES.GENERATE_INVOICE)
  @Auth(true)
  @ApiCreatedResponse({ type: GenerateInvoicesResponseDto })
  public async generateInvoice(
    @Query() payload: CreateInvoiceDto,
    @Req() request: AppRequest
  ) {
    try {
      const { user } = request;
      const createdBy = user?._id;
      const response = await firstValueFrom(
        this.superAdminServiceClient.send(
          { cmd: RMQ_MESSAGES.SUPER_ADMIN.BILLING_INVOICES.GENERATE_INVOICE },
          { ...payload, createdBy }
        )
      );

      //ActivityLog
      if (response?.data) {
        const params: ActivityLogParams = {
          performedBy: user?._id, // userId
          activityType: EActivityType.CREATED, // UPDATED
          module: EActivitylogModule.INVOICES, // module
          moduleId: response?.data?._id, // module._id
          moduleName: response?.data?.name || 'Invoice', //module.name
        };
        firstValueFrom(
          this.commonFeatureClient.emit(
            RMQ_MESSAGES.ACTIVITY_LOG.ACTIVITY_LOG,
            {
              ...params,
            }
          )
        );
        response.data.activity = true;
      }

      return response;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Patch(API_ENDPOINTS.SUPER_ADMIN.BILLING_INVOICES.UPDATE_INVOICE)
  @Auth(true)
  @ApiCreatedResponse({ type: GenerateInvoicesResponseDto })
  public async updateInvoice(
    @Query() invoice: UpdateInvoiceIdDto,
    @Body() payload: UpdateInvoiceDto,
    @Req() request: AppRequest
  ) {
    try {
      const { user } = request;
      const updatedBy = user?._id;
      const invoiceId = invoice.invoiceId;
      const response = await firstValueFrom(
        this.superAdminServiceClient.send(
          { cmd: RMQ_MESSAGES.SUPER_ADMIN.BILLING_INVOICES.UPDATE_INVOICE },
          { ...payload, updatedBy, invoiceId }
        )
      );

      //ActivityLog
      if (response?.data) {
        const params: ActivityLogParams = {
          performedBy: user?._id, // userId
          activityType: EActivityType.UPDATED, // UPDATED
          module: EActivitylogModule.INVOICES, // module
          moduleId: response?.data?._id, // module._id
          moduleName: response?.data?.name || 'Invoice', //module.name
        };
        await firstValueFrom(
          this.commonFeatureClient.emit(
            RMQ_MESSAGES.ACTIVITY_LOG.ACTIVITY_LOG,
            {
              ...params,
            }
          )
        );
        response.data.activity = true;
      }
      return response;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get(API_ENDPOINTS.SUPER_ADMIN.BILLING_INVOICES.BILLING_DETAILS)
  @Auth(true)
  @ApiCreatedResponse({ type: BillingDetailsResponseDto })
  public async billingDetails(@Query() payload: BillingDetailsDto) {
    const response = await firstValueFrom(
      this.superAdminServiceClient.send(
        { cmd: RMQ_MESSAGES.SUPER_ADMIN.BILLING_INVOICES.BILLING_DETAILS },
        { ...payload }
      )
    );
    return response;
  }
}
