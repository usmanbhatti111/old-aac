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
  AddDiscountDto,
  AddDiscountResponseDto,
  AssignOrganizationPlanDto,
  AssignOrganizationPlanResponseDto,
  BillingDetailsDto,
  BillingDetailsResponseDto,
} from '@shared/dto';
import { Response } from 'express';
import { firstValueFrom } from 'rxjs';

@ApiTags(API_TAGS.BILLING)
@Controller(CONTROLLERS.BILLING)
@ApiBearerAuth()
export class BillingController {
  constructor(
    @Inject(SERVICES.SUPER_ADMIN) private superAdminServiceClient: ClientProxy
  ) {}

  @Post(API_ENDPOINTS.BILLING.ASSIGN_PLAN)
  @ApiCreatedResponse({ type: AssignOrganizationPlanResponseDto })
  public async assignPlan(
    @Body() payload: AssignOrganizationPlanDto,
    @Res() res: Response | any
  ) {
    try {
      const assignedBy = '65152930f50394f42cee2db3';
      const response = await firstValueFrom(
        this.superAdminServiceClient.send(
          { cmd: RMQ_MESSAGES.BILLING.ASSIGN_PLAN },
          { ...payload, assigned_by_id: assignedBy }
        )
      );
      res.status(response?.statusCode).json(response);
    } catch (error) {
      const err = errorResponse(
        INTERNAL_SERVER_RESPONSE.statusCode,
        INTERNAL_SERVER_RESPONSE.message,
        error
      );
      res.status(err?.statusCode).json(err);
    }
  }

  @Get(API_ENDPOINTS.BILLING.BILLING_DETAILS)
  @ApiCreatedResponse({ type: BillingDetailsResponseDto })
  public async billingDetails(
    @Query() payload: BillingDetailsDto,
    @Res() res: Response | any
  ) {
    try {
      const response = await firstValueFrom(
        this.superAdminServiceClient.send(
          { cmd: RMQ_MESSAGES.BILLING.BILLING_DETAILS },
          { payload }
        )
      );
      res.status(response?.statusCode).json(response);
    } catch (error) {
      const err = errorResponse(
        INTERNAL_SERVER_RESPONSE.statusCode,
        INTERNAL_SERVER_RESPONSE.message,
        error
      );
      res.status(err?.statusCode).json(err);
    }
  }

  @Get(API_ENDPOINTS.BILLING.ADD_DISCOUNT)
  @ApiCreatedResponse({ type: AddDiscountResponseDto })
  public async addDiscount(
    @Query() payload: AddDiscountDto,
    @Res() res: Response | any
  ) {
    try {
      const response = await firstValueFrom(
        this.superAdminServiceClient.send(
          { cmd: RMQ_MESSAGES.BILLING.ADD_DISCOUNT },
          { payload }
        )
      );
      res.status(response?.statusCode).json(response);
    } catch (error) {
      const err = errorResponse(
        INTERNAL_SERVER_RESPONSE.statusCode,
        INTERNAL_SERVER_RESPONSE.message,
        error
      );
      res.status(err?.statusCode).json(err);
    }
  }
}
