import { Module } from '@nestjs/common';
import { SharedService } from './shared.service';
import { MongooseConfig } from './config/mongo.config';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { DbModels } from '../src/model.provider';
import {
  TicketRepository,
  InventoryRepository,
  PurchaseRepository,
  TaskRepository,
  ProductsRepository,
  UserRepository,
  PlanRepository,
  ContactRepository,
  PlanProductFeatureRepository,
  PlanProductModulePermissionRepository,
  NewsAndEventRepository,
  JobRepository,
  FaqRepository,
  PaymentRepository,
  UserAccountsRepository,
  InvoiceRepository,
  OrganizationPlanRepository,
  ProductFeaturesRepository,
  OrganizationRepository,
  OrganizationCompanyAccountRepository,
  ExpenseRepository,
  QuickLinksRepository,
  AdminRoleRepository,
  AssetsSoftwareRepository,
  FeatureRepository,
  ModuleRepository,
  PermissionRepository,
  TaskManagementRepository,
  UserORepository,
  PlanTypeRepository,
  RequestLogRepository,
} from '../src/repositories/index';
import { S3Service } from './services';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';

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
    UserRepository,
    PlanRepository,
    PlanProductFeatureRepository,
    PlanProductModulePermissionRepository,
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
    OrganizationCompanyAccountRepository,
    ExpenseRepository,
    QuickLinksRepository,
    UserRepository,
    AdminRoleRepository,
    AssetsSoftwareRepository,
    FeatureRepository,
    ModuleRepository,
    PermissionRepository,
    TaskManagementRepository,
    UserORepository,
    ContactRepository,
    PlanTypeRepository,
    ModuleRepository,
    PermissionRepository,
    RequestLogRepository,
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
  ],
  exports: [
    SharedService,
    MongooseModule.forFeature(DbModels),
    TicketRepository,
    InventoryRepository,
    PurchaseRepository,
    TaskRepository,
    ProductsRepository,
    UserRepository,
    PlanRepository,
    PlanProductFeatureRepository,
    PlanProductModulePermissionRepository,
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
    OrganizationCompanyAccountRepository,
    ExpenseRepository,
    QuickLinksRepository,
    UserRepository,
    AdminRoleRepository,
    AssetsSoftwareRepository,
    FeatureRepository,
    ModuleRepository,
    PermissionRepository,
    TaskManagementRepository,
    UserORepository,
    ContactRepository,
    PlanTypeRepository,
    ModuleRepository,
    PermissionRepository,
    RequestLogRepository,
    S3Service,
  ],
})
export class SharedModule {}
