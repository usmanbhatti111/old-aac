import { Module } from '@nestjs/common';
import { TicketController } from './controllers/ticket.controller';
import { TicketService } from './services/ticket.service';
import { ExpenseController } from './controllers/assets/expense.controller';
import { ExpenseService } from './services/assets/expense.service';
import { SharedModule } from '@shared';
import { TaskController } from './controllers/tasks.controller';
import { TaskService } from './services/tasks.service';
import { InventoryController } from './controllers/assets/inventory.controller';
import { PurchaseOrderController } from './controllers/assets/purchase.controller';
import { InventoryService } from './services/assets/inventory.service';
import { PurchaseOrderService } from './services/assets/purchase.service';
import { SoftwareController } from './controllers/assets/software.controller';
import { SoftwareService } from './services/assets/software.service';
import { TaskManagementController } from './controllers/task-management.controller';
import { TaskManagementService } from './services/task-management.service';

@Module({
  imports: [SharedModule],
  controllers: [
    TicketController,
    InventoryController,
    TaskController,
    PurchaseOrderController,
    ExpenseController,
    SoftwareController,
    TaskManagementController,
  ],
  providers: [
    TicketService,
    InventoryService,
    TaskService,
    ExpenseService,
    PurchaseOrderService,
    SoftwareService,
    TaskManagementService,
  ],
})
export class AirServicesModule {}
