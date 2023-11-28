import { Module, forwardRef } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { S3 } from '@aws-sdk/client-s3';
import { DbModels } from '../src/model.provider';
import {
  AdminRoleRepository,
  AssetsSoftwareRepository,
  ContactRepository,
  ContactStateRepository,
  ContractRepository,
  ExpenseRepository,
  AssetTypeRepository,
  FaqRepository,
  FeatureRepository,
  FileRepository,
  FolderRepository,
  InventoryRepository,
  InvoiceRepository,
  JobRepository,
  LifecycleStagesRepository,
  ModuleRepository,
  NewsAndEventRepository,
  OrganizationCompanyAccountRepository,
  OrganizationPlanRepository,
  OrganizationRepository,
  PaymentRepository,
  PermissionRepository,
  PlanProductFeatureRepository,
  PurchaseApprovalRepository,
  PlanRepository,
  PlanTypeRepository,
  ProductCategoriesRepository,
  ProductFeaturesRepository,
  ProductsRepository,
  PurchaseRepository,
  QuickLinksRepository,
  RequestLogRepository,
  TaskActivityRepository,
  TaskManagementRepository,
  TaskRepository,
  TicketRepository,
  UserAccountsRepository,
  UserORepository,
  DealPipelineRepository,
  SalesProductRepository,
  ContactNoteRepository,
  UserRepository,
  AttachmentRepository,
  ContactCallRepository,
  SoftwareUsersRepository,
  DashboardRepository,
  ReportsWidgetRepository,
  ArticlesRepository,
  ContactMeetingRepository,
  DealsRepository,
  AnnoucementRepository,
  NoteRepository,
  EmailedDashboardsRepository,
  CompanyAccountRoleRepository,
  PlanProductPermissionRepository,
  EnquiriesRepository,
  DealViewsRepository,
  ActivitylogsRepository,
  ScheduleCallRepository,
  ImportFileRepository,
  TaxCalculationRepository,
  JobApplicationsRepository,
  CustomizeColumnsRepository,
  CompanyRepository,
  ProductCatalogRepository,
} from '../src/repositories/index';
import { MongooseConfig } from './config/mongo.config';
import { SharedService } from './shared.service';
import {
  CustomizeColumnsService,
  DownloadService,
  EmailService,
  S3Service,
} from './services';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      useClass: MongooseConfig,
    }),
    MongooseModule.forFeature(DbModels),
  ],
  providers: [
    SharedService,
    TicketRepository,
    InventoryRepository,
    PurchaseRepository,
    TaskRepository,
    ProductsRepository,
    PlanRepository,
    PlanProductFeatureRepository,
    PlanProductPermissionRepository,
    NewsAndEventRepository,
    InvoiceRepository,
    OrganizationPlanRepository,
    JobRepository,
    FaqRepository,
    PaymentRepository,
    UserAccountsRepository,
    NewsAndEventRepository,
    InvoiceRepository,
    OrganizationPlanRepository,
    ProductFeaturesRepository,
    OrganizationRepository,
    ExpenseRepository,
    AssetTypeRepository,
    QuickLinksRepository,
    UserRepository,
    AdminRoleRepository,
    AssetsSoftwareRepository,
    FeatureRepository,
    ModuleRepository,
    PermissionRepository,
    UserORepository,
    TaskManagementRepository,
    PurchaseApprovalRepository,
    UserORepository,
    ContactRepository,
    PlanTypeRepository,
    RequestLogRepository,
    TaskActivityRepository,
    ContactNoteRepository,
    UserORepository,
    FolderRepository,
    FileRepository,
    ProductCategoriesRepository,
    RequestLogRepository,
    OrganizationCompanyAccountRepository,
    ContactStateRepository,
    ContractRepository,
    DealPipelineRepository,
    SalesProductRepository,
    AttachmentRepository,
    ContactCallRepository,
    LifecycleStagesRepository,
    SoftwareUsersRepository,
    DashboardRepository,
    EmailedDashboardsRepository,
    ReportsWidgetRepository,
    ContactMeetingRepository,
    DealsRepository,
    AnnoucementRepository,
    NoteRepository,
    EnquiriesRepository,
    TaxCalculationRepository,
    DealViewsRepository,
    ActivitylogsRepository,
    ScheduleCallRepository,
    ImportFileRepository,
    JobApplicationsRepository,
    CustomizeColumnsRepository,
    CompanyRepository,
    {
      provide: 'S3',
      useFactory: (config: ConfigService) =>
        new S3({
          region: config.get('S3_REGION'),
          credentials: {
            accessKeyId: config.get('S3_AWS_ACCESS_KEY'),
            secretAccessKey: config.get('S3_AWS_SECRET_KEY'),
          },
        }),
      inject: [ConfigService],
    },
    S3Service,
    DownloadService,
    ArticlesRepository,
    EmailService,
    CustomizeColumnsService,
    CompanyAccountRoleRepository,
    ProductCatalogRepository,
  ],
  exports: [
    SharedService,
    MongooseModule.forFeature(DbModels),
    TicketRepository,
    InventoryRepository,
    PurchaseRepository,
    TaskRepository,
    ProductsRepository,
    PlanRepository,
    PlanProductFeatureRepository,
    PlanProductPermissionRepository,
    NewsAndEventRepository,
    InvoiceRepository,
    OrganizationPlanRepository,
    JobRepository,
    FaqRepository,
    PaymentRepository,
    UserAccountsRepository,
    NewsAndEventRepository,
    InvoiceRepository,
    OrganizationPlanRepository,
    AnnoucementRepository,
    ProductFeaturesRepository,
    OrganizationRepository,
    OrganizationCompanyAccountRepository,
    ExpenseRepository,
    AssetTypeRepository,
    QuickLinksRepository,
    UserRepository,
    AdminRoleRepository,
    AssetsSoftwareRepository,
    FeatureRepository,
    ModuleRepository,
    PermissionRepository,
    UserORepository,
    TaskManagementRepository,
    DashboardRepository,
    EmailedDashboardsRepository,
    UserORepository,
    ContactRepository,
    PlanTypeRepository,
    RequestLogRepository,
    TaskActivityRepository,
    ContactNoteRepository,
    UserORepository,
    FolderRepository,
    FileRepository,
    ProductCategoriesRepository,
    RequestLogRepository,
    ContractRepository,
    S3Service,
    ContractRepository,
    AttachmentRepository,
    DownloadService,
    ContactStateRepository,
    ContactCallRepository,
    LifecycleStagesRepository,
    ReportsWidgetRepository,
    SoftwareUsersRepository,
    ArticlesRepository,
    ContactMeetingRepository,
    DealPipelineRepository,
    SalesProductRepository,
    DealsRepository,
    NoteRepository,
    ActivitylogsRepository,
    PurchaseApprovalRepository,
    EmailService,
    CompanyAccountRoleRepository,
    EnquiriesRepository,
    TaxCalculationRepository,
    DealViewsRepository,
    ScheduleCallRepository,
    ImportFileRepository,
    JobApplicationsRepository,
    CustomizeColumnsRepository,
    CustomizeColumnsService,
    CompanyRepository,
    ProductCatalogRepository,
  ],
})
export class SharedModule {}
