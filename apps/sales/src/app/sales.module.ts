import { Module } from '@nestjs/common';

import { DealPipelineController } from './controllers/deal-pipeline.controller';
import { SalesProductController } from './controllers/sales-product.controller';
import { DealPipelineService } from './services/deal-pipeline.service';
import { SalesProductService } from './services/sales-product.service';
import { SharedModule } from '@shared';
import { DealsController } from './controllers/deals.controller';
import { DealsService } from './services/deals.service';
import { NoteController } from './controllers/note.controller';
import { NoteService } from './services/note.service';

@Module({
  imports: [SharedModule],
  controllers: [
    DealPipelineController,
    SalesProductController,
    DealsController,
    NoteController,
  ],
  providers: [
    DealPipelineService,
    SalesProductService,
    DealsService,
    NoteService,
  ],
})
export class SalesModule {}
