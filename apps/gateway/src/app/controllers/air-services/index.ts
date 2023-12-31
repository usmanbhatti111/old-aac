import { ContractController } from './assets/contract.controller';
import { ExpenseController } from './assets/expense.controller';
import { InventoryController } from './assets/inventory.controller';
import { PurchaseOrderController } from './assets/purchase.controller';
import { SoftwareController } from './assets/software.controller';
import { AirServicesDashboardController } from './dashboard/dashboard.controller';
import { ArticlesController } from './knowledge-base/articles.controller';
import { ContractTypeController } from './settings/asset-management/contract-type.controller';
import { VendorController } from './settings/asset-management/vendors.controller';
import { RequesterController } from './settings/user-management/requesters.controller';
import { ProductCatalogController } from './settings/asset-management/product-catalog.controller';
import { TaskController } from './tasks/task.controller';
import { TicketController } from './tickets/tickets.controller';
import { WorkloadManagementController } from './workload/workload-management.controller';
import { AssetTypeController } from './settings/asset-management/asset-type.controller';
export const airServicesControllers = [
  TaskController,
  TicketController,
  InventoryController,
  PurchaseOrderController,
  ExpenseController,
  SoftwareController,
  WorkloadManagementController,
  ContractController,
  AssetTypeController,
  AirServicesDashboardController,
  ArticlesController,
  ContractTypeController,
  VendorController,
  RequesterController,
  ProductCatalogController,
];
