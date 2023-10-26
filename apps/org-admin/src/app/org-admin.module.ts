import { Module } from '@nestjs/common';
import { OrganizationController } from './controllers/organization.controller';
import { OrganizationService } from './services/organization.service';
import { OrganizationCompanyAccountController } from './controllers/organization-company-account.controller';
import { OrganizationCompanyAccountService } from './services/organization-company-account.service';
import { SharedModule } from '@shared';
import { PaymentController } from './controllers/payment.controller';
import { InvoiceController } from './controllers/invoice.controller';
import { PaymentService } from './services/payment.service';
import { SubscriptionController } from './controllers/subscription.controller';
import { SubscriptionService } from './services/subscription.service';
import { InvoiceService } from './services/invoice.service';
import { ContactStatusController } from './controllers/contact-status.controller';
import { ContactStatusService } from './services/contact-status.service';
import { ProductCategoriesController } from './controllers/product-categories.controller';
import { ProductCategoriesService } from './services/product-categories.service';
import { LifecycleStagesController } from './controllers/lifecycle-controller';
import { LifecycleStagesService } from './services/lifecycle-stages.service';
import { DealsController } from './controllers/deals.controller';
import { DealsService } from './services/deals.service';

@Module({
  imports: [SharedModule],
  controllers: [
    OrganizationController,
    OrganizationCompanyAccountController,
    PaymentController,
    SubscriptionController,
    InvoiceController,
    ContactStatusController,
    ProductCategoriesController,
    LifecycleStagesController,
    DealsController,
  ],
  providers: [
    OrganizationService,
    OrganizationCompanyAccountService,
    PaymentService,
    SubscriptionService,
    InvoiceService,
    ContactStatusService,
    ProductCategoriesService,
    LifecycleStagesService,
    DealsService,
  ],
})
export class OrgAdminModule {}
