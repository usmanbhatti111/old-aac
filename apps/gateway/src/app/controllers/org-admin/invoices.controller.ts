import { Controller, Get, Inject, Query, Req } from '@nestjs/common';
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
import {
  ActivityLogParams,
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
    @Inject(SERVICES.ORG_ADMIN) private orgAdminServiceClient: ClientProxy,
    @Inject(SERVICES.COMMON_FEATURE) private commonFeatureClient: ClientProxy
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

    //ActivityLog
    if (response?.data) {
      const params: ActivityLogParams = {
        organizationId: organizationId,
        performedBy: user?._id, // userId
        activityType: EActivityType.CREATED, // UPDATED
        module: EActivitylogModule.INVOICES, // module
        moduleId: response?.data?._id, // module._id
        moduleName: 'Invoice Paid', //module.name
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
