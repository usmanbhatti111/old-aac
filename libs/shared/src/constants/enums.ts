export enum UserStatus {
  ACTIVE,
  INACTIVE,
}

export enum UserRole {
  SUPER_ADMIN = 'SUPER ADMIN',
  ADMINISTRATOR = 'ADMINISTRATOR',
  MARKETING_USER = 'MARKETING USER',
  ORG_ADMIN = 'ORGANIZATION ADMIN',
  ACCOUNT_ADMIN = 'ACCOUNT ADMIN',
  RESTRICTED_USER = 'RESTRICTED USER',
  SALES_USER = 'SALES USER',
  SUPPORT_AGENT = 'SUPPORT AGENT',
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
