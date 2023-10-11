import { Controller, Get, Inject, Patch, Query } from '@nestjs/common';
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
  AddDiscountDto,
  AddDiscountResponseDto,
  BillingDetailsDto,
  BillingDetailsResponseDto,
} from '@shared/dto';
import { firstValueFrom } from 'rxjs';

@ApiTags(API_TAGS.BILLING_INVOICES)
@Controller(CONTROLLERS.BILLING)
@ApiBearerAuth()
export class BillingController {
  constructor(
    @Inject(SERVICES.SUPER_ADMIN) private superAdminServiceClient: ClientProxy
  ) {}

  @Get(API_ENDPOINTS.SUPER_ADMIN.BILLING_INVOICES.BILLING_DETAILS)
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

  @Patch(API_ENDPOINTS.SUPER_ADMIN.BILLING_INVOICES.ADD_DISCOUNT)
  @ApiCreatedResponse({ type: AddDiscountResponseDto })
  public async addDiscount(@Query() payload: AddDiscountDto) {
    const response = await firstValueFrom(
      this.superAdminServiceClient.send(
        { cmd: RMQ_MESSAGES.SUPER_ADMIN.BILLING_INVOICES.ADD_DISCOUNT },
        { ...payload }
      )
    );
    return response;
  }
}
