import { Module } from '@nestjs/common';

import { SharedModule } from '@shared';
import { BillingController } from './controllers/billing.controller';
import { BillingService } from './services/billing.service';
import { SuperAdminController } from './controllers/super-admin.controller';
import { SuperAdminService } from './services/super-admin.service';
import { ExampleController } from './controllers/example.controller';
import { ExampleService } from './services/examples.service';
import { ProductsController } from './controllers/products.controller';
import { ProductsService } from './services/products.service';

import { JobsController } from './controllers/jobs.controller';
import { JobsService } from './services/jobs.service';
import { PlanController } from './controllers/plan.controller';
import { PlanService } from './services/plan.services';
import { ProductFeaturesController } from './controllers/product-features.controller';
import { ProductFeaturesService } from './services/product-features.service';
import { FaqsController } from './controllers/faqs.controller';
import { FaqsService } from './services/faqs.service';
import { InvoiceController } from './controllers/invoice.controller';
import { InvoiceService } from './services/invoice.service';
import { QuickLinksController } from './controllers/quick-links.controller';
import { QuickLinksService } from './services/quick-links.service';
import { NewsAndEventsController } from './controllers/news-and-event.controller';
import { NewsAndEventsService } from './services/news-and-event.service';

@Module({
  imports: [SharedModule],
  controllers: [
    ExampleController,
    ProductsController,
    JobsController,
    ProductFeaturesController,
    FaqsController,
    InvoiceController,
    SuperAdminController,
    QuickLinksController,
    PlanController,
    BillingController,
    NewsAndEventsController,
  ],
  providers: [
    ExampleService,
    ProductsService,
    JobsService,
    ProductFeaturesService,
    SuperAdminService,
    FaqsService,
    InvoiceService,
    SuperAdminService,
    QuickLinksService,
    PlanService,
    BillingService,
    NewsAndEventsService,
  ],
})
export class SuperAdminModule {}
