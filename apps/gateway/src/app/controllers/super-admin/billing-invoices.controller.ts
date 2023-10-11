import { Body, Controller, Get, Inject, Post, Query } from '@nestjs/common';
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
  RMQ_MESSAGES,
  SERVICES,
} from '@shared/constants';
import {
  AssignOrgPlanDto,
  AssignOrgPlanResponseDto,
  CreateInvoiceDto,
  GetOrgPlanResponseDto,
  ListOrgPlan,
  ListOrgPlanResponseDto,
} from '@shared/dto';
import { firstValueFrom } from 'rxjs';

@ApiTags(API_TAGS.BILLING_INVOICES)
@Controller(CONTROLLERS.ORGANIZATION_PLAN)
@ApiBearerAuth()
export class InvoiceController {
  constructor(
    @Inject(SERVICES.SUPER_ADMIN) private superAdminServiceClient: ClientProxy
  ) {}

  @Post(API_ENDPOINTS.SUPER_ADMIN.BILLING_INVOICES.ASSIGN_PLAN)
  @ApiCreatedResponse({ type: AssignOrgPlanResponseDto })
  public async assignPlan(@Body() payload: AssignOrgPlanDto) {
    try {
      const assignedBy = '65152930f50394f42cee2db3'; // TODO: get Id from token
      const response = await firstValueFrom(
        this.superAdminServiceClient.send(
          { cmd: RMQ_MESSAGES.SUPER_ADMIN.BILLING_INVOICES.ASSIGN_PLAN },
          { ...payload, assignedBy }
        )
      );
      return response;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get(API_ENDPOINTS.SUPER_ADMIN.BILLING_INVOICES.ORG_PLAN)
  @ApiOkResponse({ type: GetOrgPlanResponseDto })
  public async getOrgPlan(
    @Query('organizationPlanId') organizationPlanId: string
  ) {
    try {
      const response = await firstValueFrom(
        this.superAdminServiceClient.send(
          { cmd: RMQ_MESSAGES.SUPER_ADMIN.BILLING_INVOICES.GET_ORG_PLAN },
          organizationPlanId
        )
      );
      return response;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get(API_ENDPOINTS.SUPER_ADMIN.BILLING_INVOICES.ORG_PLANS)
  @ApiOkResponse({ type: ListOrgPlanResponseDto })
  public async listOrgPlan(@Query() query: ListOrgPlan) {
    try {
      const response = await firstValueFrom(
        this.superAdminServiceClient.send(
          { cmd: RMQ_MESSAGES.SUPER_ADMIN.BILLING_INVOICES.LIST_ORG_PLAN },
          { ...query }
        )
      );
      return response;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Post(API_ENDPOINTS.SUPER_ADMIN.BILLING_INVOICES.GENERATE_INVOICE)
  @ApiCreatedResponse({})
  public async generateInvoice(@Body() payload: CreateInvoiceDto) {
    try {
      const createdBy = '65152930f50394f42cee2db3'; // TODO: get Id from token
      const response = await firstValueFrom(
        this.superAdminServiceClient.send(
          { cmd: RMQ_MESSAGES.SUPER_ADMIN.BILLING_INVOICES.GENERATE_INVOICE },
          { ...payload, createdBy }
        )
      );
      return response;
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
