export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  BLOCKED = 'BLOCKED',
  DELETED = 'DELETED',
}

export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ORG_ADMIN = 'ORG_ADMIN',
  ORG_EMPLOYEE = 'ORG_EMPLOYEE',
  ORG_REQUESTER = 'ORG_REQUESTER',
}

export enum UserAccountStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export enum PermissionStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export enum EJobType {
  FULL_TIME = 'FULL_TIME',
  PART_TIME = 'PART_TIME',
  PERMANENT = 'PERMANENT',
  INTERNSHIP = 'INTERNSHIP',
}

export enum EJobCategories {
  SALES = 'SALES',
  MARKETING = 'MARKETING',
  SERVICES = 'SERVICES',
  OPERATIONS = 'OPERATIONS',
  LOYALTY_PROGRAM = 'LOYALTY_PROGRAM',
}
export enum EPurchaseOrderStatus {
  ORDERED = 'ORDERED',
  OPEN = 'OPEN',
  CANCELLED = 'CANCELLED',
  RECEIVED = 'RECEIVED',
  PARTLY_RECEIVED = 'PARTLY_RECEIVED',
  APPROVED = 'APPROVED',
  PENDING_APPROVAL = 'PENDING_APPROVAL',
  CLOSED = 'CLOSED',
  REJECTED = 'REJECTED',
}
export enum EApprovalStatusStatus {
  PENDING = 'PENDING',
  APPROVE = 'APPROVE',
  REJECT = 'REJECTED',
}
export enum EExtendRenewStatus {
  EXTEND = 'EXTEND',
  RENEW = 'RENEW',
  NULL = null,
}
export enum EFaqCategories {
  SALES = 'SALES',
  MARKETING = 'MARKETING',
  SERVICES = 'SERVICES',
  OPERATIONS = 'OPERATIONS',
  LOYALTY_PROGRAM = 'LOYALTY_PROGRAM',
}

export enum EExperienceLevel {
  NO_EXPERIENCE = 'NO_EXPERIENCE',
  LESS_THAN_YEAR = 'LESS_THAN_YEAR',
  ONE_TO_TWO_YEARS = 'ONE_TO_TWO_YEARS',
  THREE_TO_FOUR_YEARS = 'THREE_TO_FOUR_YEARS',
  MORE_THAN_5_YEARS = 'MORE_THAN_5_YEARS',
}

export enum EJobStatus {
  OPEN = 'OPEN',
  CLOSE = 'CLOSE',
}
export enum TicketInternalTypeEnum {
  INTERNAL = 'INTERNAL',
}

export enum TicketTypeEnum {
  INTERNAL = 'INTERNAL',
  EXTERNAL = 'INTERNAL',
}

export enum TicketPirorityEnum {
  HIGH = 'HIGH',
  LOW = 'LOW',
}
export enum TicketStatusEnum {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
  RESOLVED = 'RESOLVED',
}

export enum OrganizationPlanStatusEnum {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export enum BillingCycleEnum {
  MONTHLY = 'MONTHLY',
  QUARTERLY = 'QUARTERLY',
  HALF_YEARLY = 'HALF_YEARLY',
  YEARLY = 'YEARLY',
  ONE_TIME = 'ONE_TIME',
}

export enum LicenceTypeEnum {
  VOLUME = 'VOLUME',
  ENTERPRISE = 'ENTERPRISE',
  TRAIL = 'TRAIL',
}

export enum ProductDropDown {
  OrgAdminPanel = 'Org Admin panel',
  Sales = 'Sales',
  Services = 'Services',
  Marketing = 'Marketing',
  Operation = 'Operation',
  LoyaltyProgram = 'Loyalty Program',
}
export enum ENewsAndEventsTypes {
  EVENT = 'event',
  NEWS = 'news',
}

export enum EStatusToggle {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export enum InvoiceStatusEnum {
  PENDING = 'PENDING',
  SELECTED = 'SELECTED',
  PAID = 'PAID',
  OVERDUE = 'OVERDUE',
}

export enum StatusEnum {
  ACTIVE,
  INACTIVE,
}

export enum RecordStatusEnum {
  ACTIVE = 'ACTIVE',
  SOFT_DELETED = 'SOFT_DELETED',
  HARD_DELETED = 'HARD_DELETED',
}

export enum AssetsSoftwareStatusEnum {
  RESTRICTED = 'Restricted',
  IGNORED = 'Ignored',
  MANAGED = 'Managed',
  DISABLED = 'Disabled',
  INREVIEW = 'InReview',
}
export enum AssetsSoftwareTypeEnum {
  DESKTOP = 'Desktop',
  SAAS = 'Saas',
  MOBILE = 'Mobile',
}

export enum OutcomeEnum {
  INTERESTED = 'Interested',
  LEFT_MESSAGE = 'Left message',
  NO_RESPONSE = 'No response',
  NOT_INTERESTED = 'Not interested',
  NOT_ABLE_TO_REACH = 'Not able to reach',
  OTHERS = 'Others',
}

export enum ContactAssociationEnum {
  ATTACHMENTS = 'attachments',
  DEALS = 'deals',
  TICKETS = 'tickets',
  COMPANIES = 'companies',
  PLAYBOOKS = 'playbooks',
}

export enum AssetSoftwareCreatedAtEnum {
  NONE = 'NONE',
  ALL_TIME = 'ALL_TIME',
  TODAY = 'TODAY',
  YESTERDAY = 'YESTERDAY',
  PREVIOUS_WEEK = 'PREVIOUS_WEEK',
  PREVIOUS_MONTH = 'PREVIOUS_MONTH',
}
export enum ETaskType {
  CALL = 'Call',
  EMAIL = 'Email',
}

export enum ETaskPriority {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High',
}

export enum ETaskStatus {
  PENDING = 'Pending',
  INPROGRESS = 'Inprogress',
  COMPLETED = 'Complete',
}

export enum ETicketsTaskStatus {
  TODO = 'Todo',
  IN_PROGRESS = 'In-Progress',
  DONE = 'Done',
}

export enum ETaskNotifyStatus {
  FIVE_MINS = '5',
  TEN_MINS = '10',
  FIFTEEN_MINS = '15',
  THIRTY_MINS = '30',
}
export enum EManageWorloadStatus {
  ALL = 'ALL',
  PLANNED = 'PLANNED',
  UNPLANNED = 'UNPLANNED',
  DELAYED = 'DELAYED',
}

export enum ETaskAssociate {
  COMPANIES = 'Companies',
  CONTACTS = 'Contacts',
  DEALS = 'Deals',
  TICKETS = 'Tickets',
}

export enum ETaskReminder {
  TODAY = 'Today',
  TOMORROW = 'Tomorrow',
  IN_1_BUSINESS_DAY = 'in1businessday',
  IN_2_BUSINESS_DAY = 'in2businessday',
}

export enum EContractStatus {
  DRAFT = 'DRAFT',
  PENDING_APPROVAL = 'PENDING_APPROVAL',
  APPROVED = 'APPROVED',
  ACTIVE = 'ACTIVE',
  EXPIRED = 'EXPIRED',
  REJECTED = 'REJECTED',
  TERMINATED = 'TERMINATED',
}

export enum EMongooseDateFilter {
  NONE = 'NONE',
  ALL_TIME = 'ALL_TIME',
  TODAY = 'TODAY',
  YESTERDAY = 'YESTERDAY',
  PREVIOUS_WEEK = 'PREVIOUS_WEEK',
  PREVIOUS_MONTH = 'PREVIOUS_MONTH',
  NEXT_WEEK = 'NEXT_WEEK',
  NEXT_MONTH = 'NEXT_MONTH',
}

export enum EExportFile {
  CSV = 'CSV',
  XLS = 'XLS',
}

export enum FileType {
  PDF = 'PDF',
  PNG = 'PNG',
}
export enum IsRecurring {
  YES = 'YES',
  NO = 'NO',
}

export enum Schedule {
  DAILY = 'Daily',
  WEEKLY = 'Weekly',
  MONTHLY = 'Monthly',
}

export enum ECardTypes {
  MASTER = 'MASTER',
  VISA = 'VISA',
}

export enum EFolderType {
  KNOWLEDGE_BASE = 'KNOWLEDGE_BASE',
}

export enum EArticlesStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
}
export enum EBillingFrequency {
  MONTHLY = 'monthly',
  QUARTERLY = 'quarterly',
  SEMI_ANNUALLY = 'semi annually',
  ANNUALLY = 'annually',
  TWO_YEARS = 'two years',
}

export enum EDealType {
  NEW = 'new business',
  EXISITING = 'existing business',
}

export enum EContactMode {
  EMAIL = 'email',
  CALL = 'call',
  MEETING = 'meeting',
}

// Deal Won probability map
export enum EDealProbabilityStage {
  'NEW' = 20,
  'FOLLOW UP' = 40,
  'UNDER REVIEW' = 60,
  'DEMO' = 80,
  'NEGOTIATION' = 90,
  'WON' = 100,
  'LOW' = 0,
}

export enum ESendVerifCodeChannel {
  SMS = 'sms',
  CALLS = 'calls',
}

export enum EIsDeletedStatus {
  ACTIVE = 'ACTIVE',
  SOFT_DELETED = 'SOFT_DELETED',
  HARD_DELETED = 'HARD_DELETED',
}

export enum CompanyAccountRoleStatusEnum {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}
export enum EEnquiriesStatus {
  DONE = 'done',
  PENDING = 'pending',
}

export enum ETaxApplyOn {
  INVOICE = 'invoice',
  QUOTES = 'quotes',
  SUBSCRIPTIONS = 'subscriptions',
  PRODUCTS = 'products',
}

export enum EDealViewSharedWith {
  PRIVATE = 'PRIVATE',
  MY_TEAM = 'MY_TEAM',
  EVERYONE = 'EVERYONE',
}

export enum EActivityType {
  CREATED = 'CREATED',
  RETRIEVE = 'RETRIEVE',
  UPDATED = 'UPDATED',
  DELETED = 'DELETED',
  UPLOADED = 'UPLOADED',
  ASSOCIATED = 'ASSOCIATED',
  VERIFY = 'VERIFY',
}

export enum EActivitylogModule {
  USERS = 'USERS',
  TICKETS = 'TICKETS',
  PRODUCTS = 'PRODUCTS',
  ORGANIZATION = 'ORGANIZATION',
  PLANS = 'PLANS',
  PLAN_TYPES = 'PLAN_TYPES',
  ORGANIZATION_PLAN = 'ORGANIZATION_PLAN',
  INVOICES = 'INVOICES',
  INVENTORIES = 'INVENTORIES',
  FILES = 'FILES',
  FEATURES = 'FEATURES',
  FAQS = 'FAQS',
  EXPENSES = 'EXPENSES',
  JOBS = 'JOBS',
  PERMISSIONS = 'PERMISSIONS',
  ROLES_RIGHTS = 'ROLES_RIGHTS',
  PROPERTIES = 'PROPERTIES',
  OPERATIONS = 'OPERATIONS',
  DEALS = 'DEALS',
  DEAL_PIPELINES = 'DEAL_PIPELINES',
  FORECAST = 'FORECAST',
  QUOTES = 'QUOTES',
  ATTACHMENTS = 'ATTACHMENTS',
  NOTES = 'NOTES',
  TASKS = 'TASKS',
  CONTACTS = 'CONTACTS',
  CONTRACTS = 'CONTRACTS',
  CALLS = 'CALLS',
  MEETINGS = 'MEETINGS',
  EMAILS = 'EMAILS',
  OTHERS = 'OTHERS',
  CUSTOMIZED_COLUMNS = 'CUSTOMIZED_COLUMNS',
  MARKETING_COMPANY = 'MARKETING_COMPANY',
  COMPANY = 'COMPANY',
  ORG_USER = 'ORG_USER',
  ORG_USER_ACCOUNT = 'ORG_USER_ACCOUNT',
}

export enum EActivitylogModuleName {
  USER = 'USER',
  ACCOUNT = 'ACCOUNT',
}

export enum EApplicationStatus {
  PENDING = 'pending',
  REJECTED = 'rejected',
  SHORTLISTED = 'shortlisted',
  INTERVIEWED = 'interviewed',
}

export enum ECallsType {
  CONFERENCE = 'CONFERENCE',
  ONE_ON_ONE = 'ONE_ON_ONE',
}

export enum ECallsSetReminder {
  BEFORE_30_MIN = '30 minutes before',
  BEFORE_1_HOUR = '1 hour before',
  BEFORE_1_DAY = '1 day before',
  BEFORE_1_WEEK = '1 week before',
}

export enum ECallsStatus {
  SCHEDULED = 'Scheduled',
  MISSED = 'Missed',
  RE_SCHEDULED = 'Re-Scheduled',
  COMPLETED = 'Completed',
}

export enum ECallsStatusUpdate {
  CANCELED = 'canceled', //before call attendend
  COMPLETED = 'completed', //completed after call accept
}

export enum ECustomizeColumnType {
  DEALS = 'deals',
  COMPANIES = 'companies',
}

export enum CompanyType {
  PARTNER = 'Partner',
  VENDOR = 'Vendor',
}

export enum EProductCatalogStatus {
  IN_PRODUCTION = 'IN_PRODUCTION',
  PIPELINE = 'PIPELINE',
  RETIRED = 'RETIRED',
}

export enum EModeOfProcurement {
  BUY = 'BUY',
  LEASE = 'LEASE',
  BOTH = 'BOTH',
}
