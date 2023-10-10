import { Module } from '@nestjs/common';

import { JobsController } from './controllers/jobs.controller';
import { SharedModule } from '@shared';
import { SuperAdminController } from './controllers/super-admin.controller';
import { SuperAdminService } from './services/super-admin.service';
import { ExampleController } from './controllers/example.controller';
import { ExampleService } from './services/examples.service';
import { ProductsController } from './controllers/products.controller';
import { ProductsService } from './services/products.service';
import { JobsService } from './services/jobs.service';
import { FaqsController } from './controllers/faqs.controller';
import { FaqsService } from './services/faqs.service';
import { InvoiceController } from './controllers/invoice.controller';
import { InvoiceService } from './services/invoice.service';
import { NewsAndEventsController } from './controllers/news-and-event.controller';
import { NewsAndEventsService } from './services/news-and-event.service';

@Module({
  imports: [SharedModule],
  controllers: [
    ExampleController,
    ProductsController,
    JobsController,
    FaqsController,
    InvoiceController,
    SuperAdminController,
    NewsAndEventsController,
  ],
  providers: [
    ExampleService,
    ProductsService,
    JobsService,
    SuperAdminService,
    FaqsService,
    InvoiceService,
    SuperAdminService,
    NewsAndEventsService,
  ],
})
export class SuperAdminModule {}
