import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get<ConfigService>(ConfigService);

  app.enableCors({
    origin: true,
    credentials: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    })
  );

  const options = new DocumentBuilder()
    .setTitle('Air Apple Cart')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('api', app, document);
  await app.listen(config.get('API_GATEWAY_PORT'));
  Logger.log(
    `🚀 Application is running on: http://localhost:${config.get(
      'API_GATEWAY_PORT'
    )}`
  );
}

bootstrap();
