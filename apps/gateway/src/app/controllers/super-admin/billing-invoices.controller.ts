import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject,
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
  INTERNAL_SERVER_RESPONSE,
  RMQ_MESSAGES,
  SERVICES,
  errorResponse,
} from '@shared/constants';
import {
  AssignOrgPlanDto,
  AssignOrgPlanResponseDto,
  CreateInvoiceDto,
  GetOrgPlanResponseDto,
  ListOrgPlan,
  ListOrgPlanResponseDto,
} from '@shared/dto';
import { Response } from 'express';
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
  public async assignPlan(
    @Body() payload: AssignOrgPlanDto,
    @Res() res: Response | any
  ) {
    try {
      const assignedBy = '65152930f50394f42cee2db3';
      const response = await firstValueFrom(
        this.superAdminServiceClient.send(
          { cmd: RMQ_MESSAGES.SUPER_ADMIN.BILLING_INVOICES.ASSIGN_PLAN },
          { ...payload, assignedBy }
        )
      );
      res.status(response?.statusCode).json(response);
    } catch (error) {
      const err = errorResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        INTERNAL_SERVER_RESPONSE.message,
        error
      );
      res.status(err?.statusCode).json(err);
    }
  }

  @Get(API_ENDPOINTS.SUPER_ADMIN.BILLING_INVOICES.ORG_PLAN)
  @ApiOkResponse({ type: GetOrgPlanResponseDto })
  public async getOrgPlan(
    @Query('organizationPlanId') organizationPlanId: string,
    @Res() res: Response | any
  ) {
    try {
      const response = await firstValueFrom(
        this.superAdminServiceClient.send(
          { cmd: RMQ_MESSAGES.SUPER_ADMIN.BILLING_INVOICES.GET_ORG_PLAN },
          organizationPlanId
        )
      );
      res.status(response?.statusCode).json(response);
    } catch (error) {
      const err = errorResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        INTERNAL_SERVER_RESPONSE.message,
        error
      );
      res.status(err?.statusCode).json(err);
    }
  }

  @Get(API_ENDPOINTS.SUPER_ADMIN.BILLING_INVOICES.ORG_PLANS)
  @ApiOkResponse({ type: ListOrgPlanResponseDto })
  public async listOrgPlan(
    @Query() query: ListOrgPlan,
    @Res() res: Response | any
  ) {
    try {
      const response = await firstValueFrom(
        this.superAdminServiceClient.send(
          { cmd: RMQ_MESSAGES.SUPER_ADMIN.BILLING_INVOICES.LIST_ORG_PLAN },
          { ...query }
        )
      );
      res.status(response?.statusCode).json(response);
    } catch (error) {
      const err = errorResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        INTERNAL_SERVER_RESPONSE.message,
        error
      );
      res.status(err?.statusCode).json(err);
    }
  }

  @Post(API_ENDPOINTS.SUPER_ADMIN.BILLING_INVOICES.GENERATE_INVOICE)
  @ApiCreatedResponse({})
  public async generateInvoice(
    @Body() payload: CreateInvoiceDto,
    @Res() res: Response | any
  ) {
    try {
      const createdBy = '65152930f50394f42cee2db3';
      const response = await firstValueFrom(
        this.superAdminServiceClient.send(
          { cmd: RMQ_MESSAGES.SUPER_ADMIN.BILLING_INVOICES.GENERATE_INVOICE },
          { ...payload, createdBy }
        )
      );
      res.status(response?.statusCode).json(response);
    } catch (error) {
      const err = errorResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        INTERNAL_SERVER_RESPONSE.message,
        error
      );
      res.status(err?.statusCode).json(err);
    }
  }
}
