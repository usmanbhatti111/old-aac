import { Schema } from '@nestjs/mongoose';
import {
  Inventory,
  InventorySchema,
  Example,
  ExampleSchema,
  Ticket,
  TicketSchema,
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
