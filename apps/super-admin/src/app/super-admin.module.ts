import { Module } from '@nestjs/common';

import { SharedModule } from '@shared';
import { ExampleController } from './controllers/example.controller';
import { ExampleService } from './services/examples.service';
import { ProductsController } from './controllers/products.controller';
import { ProductsService } from './services/products.service';

@Module({
  imports: [SharedModule],
  controllers: [ExampleController, ProductsController],
  providers: [ExampleService, ProductsService],
})
export class SuperAdminModule {}
