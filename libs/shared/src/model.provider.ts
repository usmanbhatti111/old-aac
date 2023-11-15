import { MODEL } from './constants/models';
import {
  AdminRole,
  AdminRoleSchema,
  AssetsSoftware,
  AssetsSoftwareSchema,
  ContactStatus,
  ContactStatusSchema,
  Example,
  ExampleSchema,
  Expense,
  ExpenseSchema,
  Faq,
  FaqSchema,
  Feature,
  FeatureSchema,
  File,
  FileSchema,
  Folder,
  FolderSchema,
  Inventory,
  InventorySchema,
  Invoice,
  InvoiceSchema,
  Job,
  JobSchema,
  LifecycleStages,
  LifecycleStagesSchema,
  Module,
  ModuleSchema,
  NewsAndEvent,
  NewsAndEventSchema,
  Organization,
  OrganizationPlan,
  OrganizationPlanSchema,
  OrganizationSchema,
  Payment,
  PaymentSchema,
  Permission,
  PermissionSchema,
  Plan,
  PlanProductFeature,
  PlanProductFeatureSchema,
  PlanProductModulePermission,
  PlanSchema,
  PlanType,
  PlanTypeSchema,
  ProductCategories,
  ProductCategoriesSchema,
  ProductFeatures,
  ProductFeaturesSchema,
  ProductModulePermissionSchema,
  Products,
  ProductsSchema,
  Purchase,
  RequestLog,
  RequestLogSchema,
  TaskActivity,
  TaskActivitySchema,
  Status,
  StatusSchema,
  PurchaseSchema,
  QuickLinks,
  QuickLinksSchema,
  SuperAdmin,
  SuperAdminSchema,
  Task,
  TaskManagement,
  TaskManagementSchema,
  TaskSchema,
  Ticket,
  TicketSchema,
  User,
  UserAccounts,
  UserAccountsSchema,
  UserO,
  UserOSchema,
  UserSchema,
  SalesProduct,
  SalesProductSchema,
  DealPipeline,
  DealPipelineSchema,
  Contract,
  Attachment,
  AttachmentSchema,
  ContractSchema,
  Dashboard,
  DashboardSchema,
  OrganizationCompanyAccount,
  OrganizationCompanyAccountSchema,
  SoftwareUsers,
  SoftwareUsersSchema,
  ActivityLog,
  ActivityLogSchema,
  Articles,
  ArticlesSchema,
  Deals,
  DealsSchema,
  Note,
  NoteSchema,
  TaxCalculation,
  TaxCalculationSchema,
  DealViews,
  DealViewsSchema,
  PurchaseApproval,
  PurchaseApprovalSchema,
  JobApplications,
  JobApplicationsSchema,
} from './schema';
import {
  ReportsWidget,
  ReportsWidgetSchema,
} from './schema/air-services/reports-widgets.schema';

import {
  Activitylogs,
  ActivitylogsSchema,
  Contact,
  ContactCall,
  ContactCallSchema,
  ContactMeeting,
  ContactMeetingSchema,
  ContactNote,
  ContactNoteSchema,
  ContactSchema,
  CustomizeColumns,
  CustomizeColumnsSchema,
} from './schema/common-feature';

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
  {
    name: QuickLinks.name,
    schema: QuickLinksSchema,
  },
  {
    name: Folder.name,
    schema: FolderSchema,
  },
  {
    name: File.name,
    schema: FileSchema,
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
  {
    name: TaskActivity.name,
    schema: TaskActivitySchema,
  },
  {
    name: Status.name,
    schema: StatusSchema,
  },
  {
    name: ContactNote.name,
    schema: ContactNoteSchema,
  },
  {
    name: ContactStatus.name,
    schema: ContactStatusSchema,
    collection: 'conatactStatus',
  },
  {
    name: ProductCategories.name,
    schema: ProductCategoriesSchema,
  },
  {
    name: Contract.name,
    schema: ContractSchema,
  },
  {
    name: Attachment.name,
    schema: AttachmentSchema,
  },
  {
    name: ContactCall.name,
    schema: ContactCallSchema,
  },
  {
    name: LifecycleStages.name,
    schema: LifecycleStagesSchema,
    collection: MODEL.LIFECYCLE_STAGE,
  },
  {
    name: ContactMeeting.name,
    schema: ContactMeetingSchema,
  },
  {
    name: Dashboard.name,
    schema: DashboardSchema,
  },
  {
    name: OrganizationCompanyAccount.name,
    schema: OrganizationCompanyAccountSchema,
  },
  {
    name: DealPipeline.name,
    schema: DealPipelineSchema,
  },
  {
    name: SalesProduct.name,
    schema: SalesProductSchema,
  },
  {
    name: ReportsWidget.name,
    schema: ReportsWidgetSchema,
  },
  {
    name: SoftwareUsers.name,
    schema: SoftwareUsersSchema,
  },
  {
    name: ActivityLog.name,
    schema: ActivityLogSchema,
  },
  {
    name: Articles.name,
    schema: ArticlesSchema,
  },
  {
    name: Deals.name,
    schema: DealsSchema,
    collection: MODEL.DEAL,
  },
  {
    name: Note.name,
    schema: NoteSchema,
  },
  {
    name: TaxCalculation.name,
    schema: TaxCalculationSchema,
    collection: MODEL.TAX_CALCULATION,
  },
  {
    name: DealViews.name,
    schema: DealViewsSchema,
    collection: MODEL.DEAL_VIEW,
  },
  {
    name: Activitylogs.name,
    schema: ActivitylogsSchema,
  },
  {
    name: PurchaseApproval.name,
    schema: PurchaseApprovalSchema,
  },
  {
    name: JobApplications.name,
    schema: JobApplicationsSchema,
    collection: MODEL.JOB_APPLICATIONS,
  },
  {
    name: CustomizeColumns.name,
    schema: CustomizeColumnsSchema,
    collection: MODEL.CUSTOMIZE_COLUMNS,
  },
];
