import { Module } from '@nestjs/common';
import { TicketController } from './controllers/ticket.controller';
import { TicketService } from './services/ticket.service';
import { InventoryController } from './controllers/assets/inventory.controller';
import { InventoryService } from './services/assets/inventory.service';
import { SharedModule } from '@shared';
import { TaskController } from './controllers/tasks.controller';
import { TaskService } from './services/tasks.service';

@Module({
  imports: [SharedModule],
  controllers: [TicketController, InventoryController, TaskController],
  providers: [TicketService, InventoryService, TaskService],
})
export class AirServicesModule {}
