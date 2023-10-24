import { Module } from '@nestjs/common';

import { DealPipelineController } from './controllers/deal-pipeline.controller';
import { SalesProductController } from './controllers/sales-product.controller';
import { DealPipelineService } from './services/deal-pipeline.service';
import { SalesProductService } from './services/sales-product.service';
import { SharedModule } from '@shared';

@Module({
  imports: [SharedModule],
  controllers: [DealPipelineController,SalesProductController],
  providers: [DealPipelineService,SalesProductService],
})
export class SalesModule {}
