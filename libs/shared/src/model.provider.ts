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
  PurchaseSchema,
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
  Organization,
  // OrganizationCompanyAccount,
  OrganizationSchema,
  OrganizationCompanyAccountSchema,
  QuickLinks,
  QuickLinksSchema,
  User,
  UserSchema,
  AdminRole,
  ProductFeatures,
  ProductFeaturesSchema,
  AdminRoleSchema,
  AssetsSoftware,
  AssetsSoftwareSchema,
  Feature,
  FeatureSchema,
  Permission,
  PermissionSchema,
  TaskManagement,
  TaskManagementSchema,
  Purchase,
  Module,
  ModuleSchema,
  RequestLog,
  RequestLogSchema,
} from './schema';
import { Contact, ContactSchema } from './schema/common-feature';

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
    name: Purchase.name,
    schema: PurchaseSchema,
  },
  {
    name: ProductFeatures.name,
    schema: ProductFeaturesSchema,
  },
  {
    name: Ticket.name,
    schema: TicketSchema,
  },
  {
    name: Products.name,
    schema: ProductsSchema,
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
    collection: 'products',
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
    name: Organization.name,
    schema: OrganizationSchema,
  },
  // {
  //   name: OrganizationCompanyAccount.name,
  //   schema: OrganizationCompanyAccountSchema,
  // },
  {
    name: QuickLinks.name,
    schema: QuickLinksSchema,
  },
  {
    name: AssetsSoftware.name,
    schema: AssetsSoftwareSchema,
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
    name: Feature.name,
    schema: FeatureSchema,
  },
  {
    name: Permission.name,
    schema: PermissionSchema,
  },
  {
    name: TaskManagement.name,
    schema: TaskManagementSchema,
  },
  {
    name: RequestLog.name,
    schema: RequestLogSchema,
  },
  {
    name: Contact.name,
    schema: ContactSchema,
  },
  {
    name: Module.name,
    schema: ModuleSchema,
  },
];
