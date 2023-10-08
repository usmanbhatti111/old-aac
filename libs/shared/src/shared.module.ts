import { Module } from '@nestjs/common';
import { SharedService } from './shared.service';
import { MongooseConfig } from './config/mongo.config';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { DbModels } from '../src/model.provider';
import {
  TicketRepository,
  InventoryRepository,
  TaskRepository,
  JobRepository,
  FaqRepository,
  PaymentRepository,
  OrganizationRepository,
  OrganizationCompanyAccountRepository,
} from '../src/repositories/index';

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
    TaskRepository,
    JobRepository,
    FaqRepository,
    PaymentRepository,
    OrganizationRepository,
    OrganizationCompanyAccountRepository,
  ],
  exports: [
    SharedService,
    MongooseModule.forFeature(DbModels),
    TicketRepository,
    InventoryRepository,
    TaskRepository,
    JobRepository,
    FaqRepository,
    PaymentRepository,
    OrganizationRepository,
    OrganizationCompanyAccountRepository,
  ],
})
export class SharedModule {}
