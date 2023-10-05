import { Module } from '@nestjs/common';
import { SharedService } from './shared.service';
import { MongooseConfig } from './config/mongo.config';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { Example, ExampleSchema, Products, ProductsSchema } from './schema';
import { DbModels } from '../src/model.provider';

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
    ]),
    MongooseModule.forFeature(DbModels),
  ],
  providers: [SharedService],
  exports: [SharedService, MongooseModule.forFeature(DbModels)],
})
export class SharedModule {}
