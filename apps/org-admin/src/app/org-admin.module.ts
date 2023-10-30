import { Module } from '@nestjs/common';
import { SharedModule } from '@shared';
import { ContactStatusController } from './controllers/contact-status.controller';
import { InvoiceController } from './controllers/invoice.controller';
import { LifecycleStagesController } from './controllers/lifecycle-controller';
import { OrganizationCompanyAccountController } from './controllers/organization-company-account.controller';
import { OrganizationController } from './controllers/organization.controller';
import { PaymentController } from './controllers/payment.controller';
import { ProductCategoriesController } from './controllers/product-categories.controller';
import { SubscriptionController } from './controllers/subscription.controller';
import { ContactStatusService } from './services/contact-status.service';
import { InvoiceService } from './services/invoice.service';
import { LifecycleStagesService } from './services/lifecycle-stages.service';
import { OrganizationCompanyAccountService } from './services/organization-company-account.service';
import { OrganizationService } from './services/organization.service';
import { PaymentService } from './services/payment.service';
import { ProductCategoriesService } from './services/product-categories.service';
import { SubscriptionService } from './services/subscription.service';

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
  ],
})
export class OrgAdminModule {}
