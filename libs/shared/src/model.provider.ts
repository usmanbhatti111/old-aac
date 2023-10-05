import {
  Asset,
  AssetSchema,
  Example,
  ExampleSchema,
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
} from './schema';

export const DbModels = [
  {
    name: Example.name,
    schema: ExampleSchema,
  },
  {
    name: Asset.name,
    schema: AssetSchema,
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
];
