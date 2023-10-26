import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { SERVICES } from '@shared/constants';

import { SalesModule } from './app/sales.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    SalesModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBITMQ_HOST],
        queue: `${SERVICES.SALES}_QUEUE`,
        queueOptions: {
          durable: false,
        },
      },
    }
  );

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    })
  );

  await app.listen();
}
bootstrap();
