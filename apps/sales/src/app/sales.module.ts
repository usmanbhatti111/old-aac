import { Module } from '@nestjs/common';

import { DealPipelineController } from './controllers/deal-pipeline.controller';
import { SalesProductController } from './controllers/sales-product.controller';
import { DealPipelineService } from './services/deal-pipeline.service';
import { SalesProductService } from './services/sales-product.service';
import { SharedModule } from '@shared';
import { DealsController } from './controllers/deals.controller';
import { DealsService } from './services/deals.service';
import { DealViewsController } from './controllers/deal-views.controller';
import { DealViewsService } from './services/deal-views.service';

@Module({
  imports: [SharedModule],
  controllers: [
    DealPipelineController,
    SalesProductController,
    DealsController,
    DealViewsController,
  ],
  providers: [
    DealPipelineService,
    SalesProductService,
    DealsService,
    DealViewsService,
  ],
})
export class SalesModule {}
