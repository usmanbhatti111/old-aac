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
}

export enum UserAccountStatus {
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

export enum EEnquiriesStatus {
  DONE = 'done',
  PENDING = 'pending',
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
}
