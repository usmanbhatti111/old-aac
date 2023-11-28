import { Module } from '@nestjs/common';
import { TicketController } from './controllers/ticket.controller';
import { TicketService } from './services/ticket.service';
import { ExpenseController } from './controllers/assets/expense.controller';
import { ExpenseService } from './services/assets/expense.service';
import { SharedModule } from '@shared';
import { TaskController } from './controllers/tasks.controller';
import { AssetTypeController } from './controllers/settings/asset-management/asset-type.controller';
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
import { WorkloadManagementController } from './controllers/assets/workload-management.controller';
import { WorkloadManagementService } from './services/assets/workload-management.service';
import { DashboardController } from './controllers/dashboard.controller';
import { DashboardService } from './services/dashboard.service';
import { ReportWidgetController } from './controllers/reports.widget.controller';
import { ReportWidgetService } from './services/reports.widget.service';
import { ArticlesService } from './services/knowledge-base/articles.service';
import { ArticlesController } from './controllers/knowledge-base/articles.controller';
import { VendorController } from './controllers/settings/asset-management/vendors.controller';
import { VendorsService } from './services/settings/vendors.sevice';
import { AssetTypeService } from './services/settings/asset-management/asset-type.service';
import { ProductCatalogController } from './controllers/settings/asset-management/product-catalog.controller';
import { ProductCatalogService } from './services/settings/asset-management/product-catalog.service';

@Module({
  imports: [SharedModule],
  controllers: [
    TicketController,
    InventoryController,
    TaskController,
    AssetTypeController,
    PurchaseOrderController,
    ExpenseController,
    SoftwareController,
    SoftwareDeviceController,
    TaskManagementController,
    WorkloadManagementController,
    ContractController,
    DashboardController,
    ReportWidgetController,
    ArticlesController,
    VendorController,
    ProductCatalogController,
  ],
  providers: [
    TicketService,
    InventoryService,
    TaskService,
    AssetTypeService,
    ExpenseService,
    PurchaseOrderService,
    SoftwareService,
    SoftwareDeviceService,
    TaskManagementService,
    WorkloadManagementService,
    ContractService,
    DashboardService,
    ReportWidgetService,
    ArticlesService,
    VendorsService,
    ProductCatalogService,
  ],
})
export class AirServicesModule {}
