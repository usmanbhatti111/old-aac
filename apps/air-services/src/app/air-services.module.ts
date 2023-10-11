import { Module } from '@nestjs/common';
import { TicketController } from './controllers/ticket.controller';
import { TicketService } from './services/ticket.service';
import { ExpenseController } from './controllers/assets/expense.controller';
import { ExpenseService } from './services/assets/expense.service';
import { SharedModule } from '@shared';
import { TaskController } from './controllers/tasks.controller';
import { TaskService } from './services/tasks.service';
import { InventoryController } from './controllers/assets/inventory.controller';
import { InventoryService } from './services/assets/inventory.service';
import { SoftwareController } from './controllers/assets/software.controller';
import { SoftwareService } from './services/assets/software.service';

@Module({
  imports: [SharedModule],
  controllers: [
    TicketController,
    InventoryController,
    TaskController,
    ExpenseController,
    SoftwareController,
  ],
  providers: [
    TicketService,
    InventoryService,
    TaskService,
    ExpenseService,
    SoftwareService,
  ],
})
export class AirServicesModule {}
