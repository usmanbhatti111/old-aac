import { Module } from '@nestjs/common';

import { SharedModule } from '@shared';
import { ExampleController } from './controllers/example.controller';
import { ExampleService } from './services/examples.service';
import { ProductsController } from './controllers/products.controller';
import { ProductsService } from './services/products.service';
import { PlanController } from './controller/plan.controller';
import { PlanService } from './services/plan.services';

@Module({
  imports: [SharedModule],
  controllers: [ExampleController, ProductsController, PlanController],
  providers: [ExampleService, ProductsService, PlanService],
})
export class SuperAdminModule { }
