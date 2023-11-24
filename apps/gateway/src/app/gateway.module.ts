import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { SERVICES } from '@shared/constants';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { WinstonModule } from 'nest-winston';
import { WinstonConfigService } from './config/winston.config';
import { AuthController } from './controllers/user-account/auth.controller';
import { RoleController } from './controllers/user-account/role.controller';
import { HealthController } from './controllers/healthcheck.controller';
import { PlanController } from './controllers/super-admin/plan.controller';
import { PermissionController } from './controllers/super-admin/permission.controller';
import { OrganizationController } from './controllers/organization/organization.controller';
import { OrganizationCompanyAccountController } from './controllers/organization/organization-company-account.controller';
import { TaskController } from './controllers/air-services/tasks/task.controller';
import { SuperAdminController } from './controllers/super-admin.controller';
import { JobsController } from './controllers/settings/jobs.controller';
import { InvoiceController } from './controllers/super-admin/billing-invoices.controller';
import { ProductsController } from './controllers/products.controller';
import { ProductFeaturesController } from './controllers/product-features.controller';
import { NewsAndEventsController } from './controllers/super-admin/news-and-events.contoller';
import { FaqsController } from './controllers/settings/faqs.controller';
import { PaymentController } from './controllers/org-admin/payment.controller';
import { QuickLinksController } from './controllers/super-admin/quick-links.controller';
import { InvoicesController } from './controllers/org-admin/invoices.controller';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { ExceptionsFilter } from './shared/filters/exceptions.filter';
import { UserController } from './controllers/user-account/user.controller';
import { AuthGuard } from './shared/guards/auth.guard';
import { TaskManagementController } from './controllers/tasks/task-management.controller';
// import { ActivityLogMiddleware } from './middleware/activity-log.middleware';
import { RequestLogController } from './controllers/log/request-log.controller';
import { SubscriptionController } from './controllers/org-admin/subscription.controller';
import { ContactController } from './controllers/common-features/contact/contact.controller';
import { DocumentsController } from './controllers/common-features/documents.controller';
import { ProductCategoriesController } from './controllers/org-admin/product-category.controller';
import { ColumnPipe } from './pipes/column.pipe';
import { SharedModule } from '@shared';
import { ContactStatusController } from './controllers/org-admin/contact-status.controller';
import { LifecycleStagesController } from './controllers/org-admin/lifecycle-stages.controller';
import { DealPipelineController } from './controllers/sales-settings/deal-pipeline.controller';
import { SalesProductController } from './controllers/sales-settings/sales-product.controller';
import { AttachmentController } from './controllers/common-features/attachment.controller';
import { ActivityLogController } from './controllers/common-features/activity-log.controller';

import { ReportsWidgetController } from './controllers/reports-widgets.controller';
// import { ActivityLogController } from './controllers/common-features/activity-log.controller';
// import { CallsController } from './controllers/common-features/calls.controller';
import { ContactNoteController } from './controllers/common-features/contact/contact-note.controller';
import { ContactCallController } from './controllers/common-features/contact/contact-call.controller';
import { ContactMeetingController } from './controllers/common-features/contact/contact-meeting.controller';
import { DealsController } from './controllers/sales/deals.controller';
import { EnquiriesController } from './controllers/super-admin/enquiries.controller';
import { TaxCalculationController } from './controllers/super-admin/tax-calculation.controller';
import { DealViewsController } from './controllers/sales/deal-views.controller';
import { ActivitylogsController } from './controllers/common-features/activitylogs.controller';
import { JobApplicationsController } from './controllers/super-admin/job-applications.controller';
import { CustomizedColumnsController } from './controllers/customize-columns.controller';
import { DropdownController } from './controllers/common-features/dropdown.controller';
import { NoteController } from './controllers/common-features/note.controller';
import { CompaniesController } from './controllers/common-features/companies.controller';
import { airServicesControllers } from './controllers/air-services';

@Module({
  imports: [
    ConfigModule.forRoot(),
    WinstonModule.forRootAsync({
      useClass: WinstonConfigService,
    }),
    SharedModule,
  ],
  controllers: [
    AppController,
    AuthController,
    RoleController,
    UserController,
    HealthController,
    PlanController,
    SuperAdminController,
    JobsController,
    ProductsController,
    ProductFeaturesController,
    OrganizationController,
    OrganizationCompanyAccountController,
    FaqsController,
    InvoiceController,
    TaskController,
    NewsAndEventsController,
    PaymentController,
    QuickLinksController,
    InvoicesController,
    TaskManagementController,
    RequestLogController,
    SubscriptionController,
    ContactController,
    ContactNoteController,
    ContactCallController,
    ContactMeetingController,
    ContactStatusController,
    DocumentsController,
    ProductCategoriesController,
    LifecycleStagesController,
    DealPipelineController,
    SalesProductController,
    AttachmentController,
    ActivityLogController,
    ReportsWidgetController,
    // ActivityLogController,
    ReportsWidgetController,
    // CallsController,
    DealsController,
    NoteController,
    PermissionController,
    EnquiriesController,
    TaxCalculationController,
    DealViewsController,
    ActivitylogsController,
    JobApplicationsController,
    CustomizedColumnsController,
    DropdownController,
    CompaniesController,
    ...airServicesControllers,
  ],
  providers: [
    // Exceptions Filter
    { provide: APP_FILTER, useClass: ExceptionsFilter },
    // Guards
    { provide: APP_GUARD, useClass: AuthGuard },
    ColumnPipe,
    // Connecting to all the rabbitmq queues
    ...Object.values(SERVICES).map((SERVICE_NAME) => {
      return {
        provide: SERVICE_NAME,
        useFactory: (config: ConfigService) => {
          return ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
              urls: [config.get('RABBITMQ_HOST')],
              queue: `${SERVICE_NAME}_QUEUE`,
              prefetchCount: 1,
              queueOptions: {
                durable: false,
              },
            },
          });
        },
        inject: [ConfigService],
      };
    }),
  ],
})
export class GatewayModule implements NestModule {
  constructor(private config: ConfigService) {}
  configure(consumer: MiddlewareConsumer) {
    if (this.config.get('NODE_ENV') != 'production') {
      consumer.apply(LoggerMiddleware).forRoutes('*');
    }
    consumer.apply(LoggerMiddleware).exclude('healthcheck(.*)').forRoutes('*');
    //consumer.apply(ActivityLogMiddleware).forRoutes('*');
  }
}
