import { Module } from '@nestjs/common';
import { OrganizationController } from './controllers/organization.controller';
import { OrganizationService } from './services/organization.service';
import { OrganizationCompanyAccountController } from './controllers/organization-company-account.controller';
import { OrganizationCompanyAccountService } from './services/organization-company-account.service';
import { SharedModule } from '@shared';
import { PaymentController } from './controllers/payment.controller';
import { InvoiceController } from './controllers/invoice.controller';
import { PaymentService } from './services/payment.service';
import { InvoiceService } from './services/invoice.service';

@Module({
  imports: [SharedModule],
  controllers: [
    OrganizationController,
    OrganizationCompanyAccountController,
    PaymentController,
    InvoiceController,
  ],
  providers: [
    OrganizationService,
    OrganizationCompanyAccountService,
    PaymentService,
    InvoiceService,
  ],
})
export class OrgAdminModule {}
