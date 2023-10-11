import { Module } from '@nestjs/common';
import { SharedService } from './shared.service';
import { MongooseConfig } from './config/mongo.config';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import {
  Example,
  ExampleSchema,
  Products,
  ProductsSchema,
  SuperAdminSchema,
  SuperAdmin,
  Faq,
  FaqSchema,
  Job,
  JobSchema,
  ProductFeatures,
  ProductFeaturesSchema,
} from './schema';
import { DbModels } from '../src/model.provider';
import {
  TicketRepository,
  InventoryRepository,
  TaskRepository,
  PlanRepository,
  PlanProductFeatureRepository,
  PlanProductModulePermissionRepository,
  NewsAndEventRepository,
  InvoiceRepository,
  OrganizationPlanRepository,
  JobRepository,
  FaqRepository,
  PaymentRepository,
  ProductFeaturesRepository,
  OrganizationRepository,
  OrganizationCompanyAccountRepository,
  ExpenseRepository,
  AssetsSoftwareRepository,
  ProductRepository,
  FeatureRepository,
  // ModuleRepository,
  // PermissionRepository,
} from '../src/repositories/index';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      useClass: MongooseConfig,
    }),
    MongooseModule.forFeature([
      {
        name: Example.name,
        schema: ExampleSchema,
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
        name: Job.name,
        schema: JobSchema,
      },
      {
        name: Faq.name,
        schema: FaqSchema,
      },
      {
        name: ProductFeatures.name,
        schema: ProductFeaturesSchema,
      },
    ]),
    MongooseModule.forFeature(DbModels),
  ],
  providers: [
    SharedService,
    TicketRepository,
    InventoryRepository,
    TaskRepository,
    PlanRepository,
    PlanProductFeatureRepository,
    PlanProductModulePermissionRepository,
    NewsAndEventRepository,
    InvoiceRepository,
    OrganizationPlanRepository,
    JobRepository,
    FaqRepository,
    PaymentRepository,
    ProductFeaturesRepository,
    OrganizationRepository,
    OrganizationCompanyAccountRepository,
    ExpenseRepository,
    AssetsSoftwareRepository,
    ProductRepository,
    FeatureRepository,
    // ModuleRepository,
    // PermissionRepository,
  ],
  exports: [
    SharedService,
    MongooseModule.forFeature(DbModels),
    TicketRepository,
    InventoryRepository,
    TaskRepository,
    PlanRepository,
    PlanProductFeatureRepository,
    PlanProductModulePermissionRepository,
    NewsAndEventRepository,
    InvoiceRepository,
    OrganizationPlanRepository,
    JobRepository,
    FaqRepository,
    PaymentRepository,
    ProductFeaturesRepository,
    OrganizationRepository,
    OrganizationCompanyAccountRepository,
    ExpenseRepository,
    AssetsSoftwareRepository,
    ProductRepository,
    FeatureRepository,
    // ModuleRepository,
    // PermissionRepository,
  ],
})
export class SharedModule {}
