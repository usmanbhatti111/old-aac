import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { SERVICES } from '@shared/constants';

import { LoyaltyProgramModule } from './app/loyalty-program.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    LoyaltyProgramModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBITMQ_HOST],
        queue: `${SERVICES.LOYALTY_PROGRAM}_QUEUE`,
        queueOptions: {
          durable: false,
        },
      },
    }
  );
  await app.listen();
}
bootstrap();
