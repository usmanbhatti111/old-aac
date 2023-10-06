import {
  Body,
  Controller,
  HttpStatus,
  Inject,
  Post,
  Res,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
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
  AssignOrganizationPlanDto,
  AssignOrganizationPlanResponseDto,
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
  @ApiCreatedResponse({ type: AssignOrganizationPlanResponseDto })
  public async assignPlan(
    @Body() payload: AssignOrganizationPlanDto,
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
}
