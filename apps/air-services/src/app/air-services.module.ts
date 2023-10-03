import { Module } from '@nestjs/common';
import { TicketController } from './controllers/ticket.controller';
import { TicketService } from './services/ticket.service';
import { InventoryController } from './controllers/inventory.controller';
import { InventoryService } from './services/inventory.service';
import { SharedModule } from '@shared';

@Module({
  imports: [SharedModule],
  controllers: [TicketController, InventoryController],
  providers: [TicketService, InventoryService],
  exports: [TicketService, InventoryService],
})
export class AirServicesModule {}
