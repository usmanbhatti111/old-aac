import { Body, Controller, Get, Inject, Query, Res } from '@nestjs/common';
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
  GetAllInvoicesDto,
  GetAllInvoicesResponseDto,
  GetInvoiceDto,
  GetInvoiceResponseDto,
} from '@shared/dto';
import { Response } from 'express';
import { firstValueFrom } from 'rxjs';

@ApiTags(API_TAGS.INVOICES)
@Controller(CONTROLLERS.INVOICES)
@ApiBearerAuth()
export class InvoicesController {
  constructor(
    @Inject(SERVICES.ORG_ADMIN) private orgAdminServiceClient: ClientProxy
  ) {}

  @Get()
  @ApiCreatedResponse({ type: GetAllInvoicesResponseDto })
  public async getAllInvoices(
    @Body() payload: GetAllInvoicesDto,
    @Res() res: Response | any
  ) {
    try {
      const orgId = '65152930f50394f42cee2db3';
      const response = await firstValueFrom(
        this.orgAdminServiceClient.send(
          { cmd: RMQ_MESSAGES.INVOICES.GET_ALL_INVOICES },
          { ...payload, orgId: orgId }
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

  @Get(API_ENDPOINTS.INVOICES.GET_ONE)
  @ApiCreatedResponse({ type: GetInvoiceResponseDto })
  public async getOneInvoice(
    @Query() payload: GetInvoiceDto,
    @Res() res: Response | any
  ) {
    try {
      const response = await firstValueFrom(
        this.orgAdminServiceClient.send(
          { cmd: RMQ_MESSAGES.INVOICES.GET_ONE_INVOICE },
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
        this.orgAdminServiceClient.send(
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
