import { Module } from '@nestjs/common';
import { InventoryController } from './controllers/inventory.controller';
import { InventoryService } from './services/inventory.service';
import { SharedModule } from '@shared';

@Module({
  imports: [SharedModule],
  controllers: [InventoryController],
  providers: [InventoryService],
})
export class AirServicesModule {}
