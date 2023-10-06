import { Module } from '@nestjs/common';

import { JobsController } from './controllers/jobs.controller';
import { SharedModule } from '@shared';
import { SuperAdminController } from './controllers/super-admin.controller';
import { SuperAdminService } from './services/super-admin.service';
import { ExampleController } from './controllers/example.controller';
import { ExampleService } from './services/examples.service';
import { BillingController } from './controllers/billing.controller';
import { BillingService } from './services/billing.service';
import { ProductsController } from './controllers/products.controller';
import { ProductsService } from './services/products.service';
import { JobsService } from './services/jobs.service';
import { InvoiceController } from './controllers/invoice.controller';
import { InvoiceService } from './services/invoice.service';

@Module({
  imports: [SharedModule],
  controllers: [
    ExampleController,
    BillingController,
    ProductsController,
    JobsController,
    InvoiceController,
    SuperAdminController,
  ],
  providers: [
    ExampleService,
    BillingService,
    ProductsService,
    JobsService,
    ProductsService,
    JobsService,
    InvoiceService,
    SuperAdminService,
  ],
})
export class SuperAdminModule {}
