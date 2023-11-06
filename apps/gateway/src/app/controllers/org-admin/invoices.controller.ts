import { Controller, Get, Inject, Query, Req } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import {
  API_ENDPOINTS,
  API_TAGS,
  CONTROLLERS,
  RMQ_MESSAGES,
  SERVICES,
} from '@shared/constants';
import {
  GetAllInvoicesDto,
  GetAllInvoicesResponseDto,
  GetInvoiceDto,
  GetInvoiceResponseDto,
  PayNowDto,
} from '@shared/dto';
import { firstValueFrom } from 'rxjs';
import { Auth } from '../../decorators/auth.decorator';
import { AppRequest } from '../../shared/interface/request.interface';

@ApiTags(API_TAGS.BILLING_INVOICES)
@Controller(CONTROLLERS.ORG_ADMIN.INVOICES)
@ApiBearerAuth()
export class InvoicesController {
  constructor(
    @Inject(SERVICES.ORG_ADMIN) private orgAdminServiceClient: ClientProxy
  ) {}

  @Auth(true)
  @Get()
  @ApiCreatedResponse({ type: GetAllInvoicesResponseDto })
  public async getAllInvoices(
    @Query() payload: GetAllInvoicesDto,
    @Req() request: AppRequest
  ) {
    const { user } = request;
    const organizationId = user?.organization;
    const userId = user._id;
    const userRole = user.role;

    const response = await firstValueFrom(
      this.orgAdminServiceClient.send(
        { cmd: RMQ_MESSAGES.ORG_ADMIN.INVOICES.GET_ALL_INVOICES },
        { ...payload, organizationId, userId, userRole }
      )
    );
    return response;
  }

  @Auth(true)
  @Get(API_ENDPOINTS.ORG_ADMIN.INVOICES.PAY_NOW_INVOICE)
  @ApiCreatedResponse({ type: GetInvoiceResponseDto })
  public async payNowInvoice(
    @Query() payload: PayNowDto,
    @Req() request: AppRequest
  ) {
    const { user } = request;
    const organizationId = user?.organization;
    const response = await firstValueFrom(
      this.orgAdminServiceClient.send(
        { cmd: RMQ_MESSAGES.ORG_ADMIN.INVOICES.PAY_NOW_INVOICE },
        { ...payload, organizationId, userId: user._id }
      )
    );
    return response;
  }

  @Auth(true)
  @Get(API_ENDPOINTS.ORG_ADMIN.INVOICES.GET_ONE)
  @ApiCreatedResponse({ type: GetInvoiceResponseDto })
  public async getOneInvoice(
    @Query() payload: GetInvoiceDto,
    @Req() request: AppRequest
  ) {
    const { user } = request;
    const organizationId = user?.organization;
    const response = await firstValueFrom(
      this.orgAdminServiceClient.send(
        { cmd: RMQ_MESSAGES.ORG_ADMIN.INVOICES.GET_ONE_INVOICE },
        { ...payload, organizationId }
      )
    );
    return response;
  }
}
