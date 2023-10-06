import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { SERVICES } from '@shared/constants';

import { OrgAdminModule } from './app/org-admin.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    OrgAdminModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBITMQ_HOST],
        queue: `${SERVICES.ORG_ADMIN}_QUEUE`,
        queueOptions: {
          durable: false,
        },
      },
    }
  );
  await app.listen();
}
bootstrap();
