import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { SERVICES } from '@shared/constants';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBITMQ_HOST],
        queue: `${SERVICES.SUPER_ADMIN_SERVICE}_QUEUE`,
        queueOptions: {
          durable: false,
        },
      },
    }
  );
  await app.listen();
}
bootstrap();
