import { Module } from '@nestjs/common';
import { SharedService } from './shared.service';
import { MongooseConfig } from './config/mongo.config';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { Example, ExampleSchema } from './schema';

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
    ]),
  ],
  providers: [SharedService],
  exports: [
    SharedService,
    MongooseModule.forFeature([
      {
        name: Example.name,
        schema: ExampleSchema,
      },
    ]),
  ],
})
export class SharedModule {}
