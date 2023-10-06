import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppController } from './app.controller';
import { SERVICES } from '@shared/constants';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { WinstonModule } from 'nest-winston';
import { WinstonConfigService } from './config/winston.config';
import { AuthController } from './controllers/auth.controller';
import { HealthController } from './controllers/healthcheck.controller';
import { PlanController } from './controllers/plan.controller';
import { TaskController } from './controllers/tasks/task.controller';
import { SuperAdminController } from './controllers/super-admin.controller';
import { JobsController } from './controllers/settings/jobs.controller';
import { TicketController } from './controllers/tickets/tickets.controller';
import { InvoiceController } from './controllers/super-admin/billing-invoices.controller';
import { InventoryController } from './controllers/assets/inventory.controller';
import { ProductsController } from './controllers/products.controller';
import { PaymentController } from './controllers/org-admin/payment.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    WinstonModule.forRootAsync({
      useClass: WinstonConfigService,
    }),
  ],
  controllers: [
    AppController,
    AuthController,
    HealthController,
    PlanController,
    SuperAdminController,
    JobsController,
    ProductsController,
    TicketController,
    InventoryController,
    InvoiceController,
    TaskController,
    PaymentController,
  ],
  providers: [
    // Connected to all the rabbitmq queues
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
  }
}
