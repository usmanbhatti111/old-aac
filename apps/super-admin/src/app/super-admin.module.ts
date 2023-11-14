import { Module } from '@nestjs/common';
import { SharedModule } from '@shared';
import { ExampleController } from './controllers/example.controller';
import { ProductsController } from './controllers/products.controller';
import { SuperAdminController } from './controllers/super-admin.controller';
import { ExampleService } from './services/examples.service';
import { ProductsService } from './services/products.service';
import { SuperAdminService } from './services/super-admin.service';

import { ScheduleModule } from '@nestjs/schedule';
import { PermissionController } from './controllers/permission.controller';
import { PermissionService } from './services/permission.service';
import { FaqsController } from './controllers/faqs.controller';
import { InvoiceController } from './controllers/invoice.controller';
import { JobApplicationsController } from './controllers/job-applicaton.controller';
import { JobsController } from './controllers/jobs.controller';
import { NewsAndEventsController } from './controllers/news-and-event.controller';
import { PlanController } from './controllers/plan.controller';
import { ProductFeaturesController } from './controllers/product-features.controller';
import { QuickLinksController } from './controllers/quick-links.controller';
import { TaxCalculationController } from './controllers/tax-calculation.controller';
import { FaqsService } from './services/faqs.service';
import { InvoiceService } from './services/invoice.service';
import { JobApplicationsService } from './services/job-application.service';
import { JobsService } from './services/jobs.service';
import { NewsAndEventsService } from './services/news-and-event.service';
import { PlanService } from './services/plan.services';
import { ProductFeaturesService } from './services/product-features.service';
import { QuickLinksService } from './services/quick-links.service';
import { TaxCalculationService } from './services/tax-calculation.service';
@Module({
  imports: [SharedModule, ScheduleModule.forRoot()],
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
    NewsAndEventsController,
    PermissionController,
    TaxCalculationController,
    JobApplicationsController,
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
    NewsAndEventsService,
    PermissionService,
    TaxCalculationService,
    JobApplicationsService,
  ],
})
export class SuperAdminModule {}
