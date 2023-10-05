import { Module } from '@nestjs/common';

import { JobsController } from './controllers/jobs.controller';
import { SharedModule } from '@shared';
import { ExampleController } from './controllers/example.controller';
import { ExampleService } from './services/examples.service';
import { ProductsController } from './controllers/products.controller';
import { ProductsService } from './services/products.service';
import { JobsService } from './services/jobs.service';

@Module({
  imports: [SharedModule],
  controllers: [ExampleController, ProductsController, JobsController],
  providers: [ExampleService, ProductsService, JobsService],
})
export class SuperAdminModule {}
