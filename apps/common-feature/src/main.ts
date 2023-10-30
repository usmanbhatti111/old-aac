import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { SERVICES } from '@shared/constants';
import { CommonFeatureModule } from './app/common-feature.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    CommonFeatureModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBITMQ_HOST],
        queue: `${SERVICES.COMMON_FEATURE}_QUEUE`,
        queueOptions: {
          durable: false,
        },
      },
    }
  );
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await app.listen();
}
bootstrap();
