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
import { SoftwareDeviceService } from './services/assets/software-device.service';
import { SoftwareDeviceController } from './controllers/assets/software-device.controller';
import { TaskManagementController } from './controllers/task-management.controller';
import { TaskManagementService } from './services/task-management.service';
import { ContractController } from './controllers/assets/contract.controller';
import { ContractService } from './services/assets/contract.service';
import { AirServiceAttachmentController } from './controllers/air-service-attachment.controller';
import { AirServiceAttachmentService } from './services/air-service-attachment.service';

@Module({
  imports: [SharedModule],
  controllers: [
    TicketController,
    InventoryController,
    TaskController,
    PurchaseOrderController,
    ExpenseController,
    SoftwareController,
    SoftwareDeviceController,
    TaskManagementController,
    ContractController,
    AirServiceAttachmentController,
  ],
  providers: [
    TicketService,
    InventoryService,
    TaskService,
    ExpenseService,
    PurchaseOrderService,
    SoftwareService,
    SoftwareDeviceService,
    TaskManagementService,
    ContractService,
    AirServiceAttachmentService,
  ],
})
export class AirServicesModule {}
