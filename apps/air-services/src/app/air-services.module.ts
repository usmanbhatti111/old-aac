import { Module } from '@nestjs/common';
import { TicketController } from './controllers/ticket.controller';
import { TicketService } from './services/ticket.service';
import { InventoryController } from './controllers/assets/inventory.controller';
import { InventoryService } from './services/assets/inventory.service';
import { SharedModule } from '@shared';

@Module({
  imports: [SharedModule],
  controllers: [TicketController, InventoryController],
  providers: [TicketService, InventoryService],
})
export class AirServicesModule {}
