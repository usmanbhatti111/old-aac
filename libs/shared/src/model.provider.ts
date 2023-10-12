import {
  Example,
  ExampleSchema,
  Ticket,
  TicketSchema,
  Plan,
  PlanProductFeature,
  PlanProductFeatureSchema,
  PlanProductModulePermission,
  ProductModulePermissionSchema,
  PlanSchema,
  PlanType,
  PlanTypeSchema,
  Expense,
  ExpenseSchema,
  Inventory,
  InventorySchema,
  OrganizationPlan,
  OrganizationPlanSchema,
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
  UserO,
  UserOSchema,
  NewsAndEvent,
  NewsAndEventSchema,
  Invoice,
  InvoiceSchema,
  Payment,
  PaymentSchema,
  UserAccounts,
  UserAccountsSchema,
  Product,
  ProductSchema,
  Organization,
  OrganizationCompanyAccount,
  OrganizationSchema,
  OrganizationCompanyAccountSchema,
  User,
  UserSchema,
  AdminRole,
  AdminRoleSchema,
  AssetsSoftware,
  AssetsSoftwareSchema,
  Module,
  ModuleSchema,
  Feature,
  FeatureSchema,
  Permission,
  PermissionSchema,
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
    name: PlanProductFeature.name,
    schema: PlanProductFeatureSchema,
  },
  {
    name: PlanProductModulePermission.name,
    schema: ProductModulePermissionSchema,
  },
  {
    name: PlanType.name,
    schema: PlanTypeSchema,
  },
  {
    name: Expense.name,
    schema: ExpenseSchema,
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
    name: User.name,
    schema: UserSchema,
  },
  {
    name: UserO.name,
    schema: UserOSchema,
  },
  {
    name: NewsAndEvent.name,
    schema: NewsAndEventSchema,
  },
  {
    name: Invoice.name,
    schema: InvoiceSchema,
  },
  {
    name: Payment.name,
    schema: PaymentSchema,
  },
  {
    name: UserAccounts.name,
    schema: UserAccountsSchema,
  },
  {
    name: Product.name,
    schema: ProductSchema,
  },
  {
    name: Organization.name,
    schema: OrganizationSchema,
  },
  {
    name: OrganizationCompanyAccount.name,
    schema: OrganizationCompanyAccountSchema,
  },
  {
    name: User.name,
    schema: UserSchema,
  },
  {
    name: AdminRole.name,
    schema: AdminRoleSchema,
  },
  {
    name: AssetsSoftware.name,
    schema: AssetsSoftwareSchema,
  },
  {
    name: Module.name,
    schema: ModuleSchema,
  },
  {
    name: Feature.name,
    schema: FeatureSchema,
  },
  {
    name: Permission.name,
    schema: PermissionSchema,
  },
];
