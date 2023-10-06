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
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
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
  AddPaymentMethodDto,
  AddPaymentMethodResponseDto,
  DeletePaymentDto,
  GetOnePaymentDto,
  UpdatePaymentMethodDto,
  getAllPaymentsDTO,
} from '@shared/dto';
import { Response } from 'express';
import { firstValueFrom } from 'rxjs';

@ApiTags(API_TAGS.PAYMENTS)
@Controller(CONTROLLERS.PAYMENTS)
export class PaymentController {
  constructor(
    @Inject(SERVICES.ORG_ADMIN) private orgAdminServiceClient: ClientProxy
  ) {}

  @Post()
  @ApiCreatedResponse({ type: AddPaymentMethodResponseDto })
  public async addPayment(
    @Body() payload: AddPaymentMethodDto,
    @Res() res: Response | any
  ) {
    try {
      const orgId = '65152930f50394f42cee2db3';
      const response = await firstValueFrom(
        this.orgAdminServiceClient.send(
          { cmd: RMQ_MESSAGES.ORG_ADMIN.PAYMENTS.ADD_PAYMENT },
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

  @Patch(API_ENDPOINTS.PAYMENTS.UPDATE_ONE)
  @ApiCreatedResponse({ type: AddPaymentMethodResponseDto })
  public async updatePayment(
    @Param('id') id: string,
    @Body() payload: UpdatePaymentMethodDto,
    @Res() res: Response | any
  ) {
    try {
      const orgId = '65152930f50394f42cee2db3';
      const response = await firstValueFrom(
        this.orgAdminServiceClient.send(
          { cmd: RMQ_MESSAGES.ORG_ADMIN.PAYMENTS.UPDATE_PAYMENT },
          { ...payload, id: id, orgId: orgId }
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

  @Get()
  @ApiCreatedResponse({ type: AddPaymentMethodResponseDto })
  public async getAllPayments(
    @Query() payload: getAllPaymentsDTO,
    @Res() res: Response | any
  ) {
    try {
      const orgId = '65152930f50394f42cee2db3';
      const response = await firstValueFrom(
        this.orgAdminServiceClient.send(
          { cmd: RMQ_MESSAGES.ORG_ADMIN.PAYMENTS.GET_ALL_PAYMENTS },
          { ...payload, orgId }
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

  @Get(API_ENDPOINTS.PAYMENTS.FIND_ONE)
  @ApiCreatedResponse({ type: AddPaymentMethodResponseDto })
  public async getOnePayment(
    @Param() payload: GetOnePaymentDto,
    @Res() res: Response | any
  ) {
    try {
      const orgId = '65152930f50394f42cee2db3';
      const response = await firstValueFrom(
        this.orgAdminServiceClient.send(
          { cmd: RMQ_MESSAGES.ORG_ADMIN.PAYMENTS.GET_ONE_PAYMENTS },
          { ...payload, orgId }
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

  @Delete(API_ENDPOINTS.PAYMENTS.DELETE_ONE)
  @ApiCreatedResponse({ type: AddPaymentMethodResponseDto })
  public async deletePayment(
    @Param() payload: DeletePaymentDto,
    @Res() res: Response | any
  ) {
    try {
      const response = await firstValueFrom(
        this.orgAdminServiceClient.send(
          { cmd: RMQ_MESSAGES.ORG_ADMIN.PAYMENTS.DELETE_ONE_PAYMENTS },
          { ...payload }
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
