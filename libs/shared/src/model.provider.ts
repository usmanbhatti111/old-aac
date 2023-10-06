import {
  Inventory,
  InventorySchema,
  Example,
  ExampleSchema,
  OrganizationPlan,
  OrganizationPlanSchema,
  Ticket,
  TicketSchema,
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
];
