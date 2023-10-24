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
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import {
  API_ENDPOINTS,
  API_TAGS,
  CONTROLLERS,
  RMQ_MESSAGES,
  SERVICES,
} from '@shared/constants';
import {
  AddPaymentMethodDto,
  AddPaymentMethodResponseDto,
  DeletePaymentDto,
  GetOnePaymentDto,
  PaymentIdDto,
  UpdatePaymentMethodDto,
  getAllPaymentsDTO,
} from '@shared/dto';
import { firstValueFrom } from 'rxjs';
import { Auth } from '../../decorators/auth.decorator';
import { AppRequest } from '../../shared/interface/request.interface';

@ApiTags(API_TAGS.PAYMENTS)
@Controller(CONTROLLERS.PAYMENTS)
@ApiBearerAuth()
export class PaymentController {
  constructor(
    @Inject(SERVICES.ORG_ADMIN) private orgAdminServiceClient: ClientProxy
  ) {}

  @Post()
  @Auth(true)
  @ApiCreatedResponse({ type: AddPaymentMethodResponseDto })
  public async addPayment(
    @Body() payload: AddPaymentMethodDto,
    @Req() request: AppRequest
  ) {
    try {
      const { user } = request;
      const organizationId = user?.organization;
      const createdBy = user._id;
      const response = await firstValueFrom(
        this.orgAdminServiceClient.send(
          { cmd: RMQ_MESSAGES.ORG_ADMIN.PAYMENTS.ADD_PAYMENT },
          { ...payload, organizationId, createdBy }
        )
      );
      return response;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Auth(true)
  @Patch(API_ENDPOINTS.PAYMENTS.UPDATE_ONE)
  @ApiCreatedResponse({ type: AddPaymentMethodResponseDto })
  public async updatePayment(
    @Param() id: PaymentIdDto,
    @Body() payload: UpdatePaymentMethodDto,
    @Req() request: AppRequest
  ) {
    try {
      const { user } = request;
      const organizationId = user?.organization;
      const updatedBy = user._id;
      const response = await firstValueFrom(
        this.orgAdminServiceClient.send(
          { cmd: RMQ_MESSAGES.ORG_ADMIN.PAYMENTS.UPDATE_PAYMENT },
          { ...payload, id: id.id, organizationId: organizationId, updatedBy }
        )
      );
      return response;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Auth(true)
  @Get()
  @ApiCreatedResponse({ type: AddPaymentMethodResponseDto })
  public async getAllPayments(
    @Query() payload: getAllPaymentsDTO,
    @Req() request: AppRequest
  ) {
    try {
      const { user } = request;
      const organizationId = user?.organization;
      const response = await firstValueFrom(
        this.orgAdminServiceClient.send(
          { cmd: RMQ_MESSAGES.ORG_ADMIN.PAYMENTS.GET_ALL_PAYMENTS },
          { ...payload, organizationId }
        )
      );
      return response;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Auth(true)
  @Get(API_ENDPOINTS.PAYMENTS.FIND_ONE)
  @ApiCreatedResponse({ type: AddPaymentMethodResponseDto })
  public async getOnePayment(
    @Param() payload: GetOnePaymentDto,
    @Req() request: AppRequest
  ) {
    try {
      const { user } = request;
      const organizationId = user?.organization;
      const response = await firstValueFrom(
        this.orgAdminServiceClient.send(
          { cmd: RMQ_MESSAGES.ORG_ADMIN.PAYMENTS.GET_ONE_PAYMENTS },
          { ...payload, organizationId }
        )
      );
      return response;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Auth(true)
  @Delete(API_ENDPOINTS.PAYMENTS.DELETE_ONE)
  @ApiCreatedResponse({ type: AddPaymentMethodResponseDto })
  public async deletePayment(
    @Param() payload: DeletePaymentDto,
    @Req() request: AppRequest
  ) {
    try {
      const { user } = request;
      const organizationId = user?.organization;
      const deletedBy = user._id;
      const response = await firstValueFrom(
        this.orgAdminServiceClient.send(
          { cmd: RMQ_MESSAGES.ORG_ADMIN.PAYMENTS.DELETE_ONE_PAYMENTS },
          { ...payload, organizationId, deletedBy }
        )
      );
      return response;
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
