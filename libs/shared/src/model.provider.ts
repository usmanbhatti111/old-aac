import {
  Inventory,
  InventorySchema,
  Example,
  ExampleSchema,
  OrganizationPlan,
  OrganizationPlanSchema,
  Ticket,
  TicketSchema,
  Plan,
  PlanProduct,
  PlanProductFeature,
  PlanProductFeatureSchema,
  PlanProductModule,
  PlanProductModulePermission,
  PlanProductModulePermissionSchema,
  PlanProductModuleSchema,
  PlanProductSchema,
  PlanSchema,
  PlanType,
  PlanTypeSchema,
  Task,
  TaskSchema,
  Products,
  ProductsSchema,
  SuperAdminSchema,
  SuperAdmin,
  Faq,
  FaqSchema,
  Job,
  JobSchema,
  Payment,
  PaymentSchema,
} from './schema';

export const DbModels = [
  {
    name: Example.name,
    schema: ExampleSchema,
  },
  {
    name: Inventory.name,
    schema: InventorySchema,
  },

  {
    name: Ticket.name,
    schema: TicketSchema,
  },
  {
    name: Plan.name,
    schema: PlanSchema,
  },
  {
    name: PlanProduct.name,
    schema: PlanProductSchema,
  },
  {
    name: PlanProductFeature.name,
    schema: PlanProductFeatureSchema,
  },
  {
    name: PlanProductModule.name,
    schema: PlanProductModuleSchema,
  },
  {
    name: PlanProductModulePermission.name,
    schema: PlanProductModulePermissionSchema,
  },
  {
    name: PlanType.name,
    schema: PlanTypeSchema,
  },
  {
    name: OrganizationPlan.name,
    schema: OrganizationPlanSchema,
  },
  {
    name: Task.name,
    schema: TaskSchema,
  },
  {
    name: Job.name,
    schema: JobSchema,
  },
  {
    name: Faq.name,
    schema: FaqSchema,
  },
  {
    name: Products.name,
    schema: ProductsSchema,
  },
  {
    name: SuperAdmin.name,
    schema: SuperAdminSchema,
  },
  {
    name: Payment.name,
    schema: PaymentSchema,
  },
];
