import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import basicAuth from 'express-basic-auth';

import { GatewayModule } from './app/gateway.module';

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule);

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

  if (config.get<string>('NODE_ENV') === 'production') {
    app.use(
      ['/api'],
      basicAuth({
        challenge: true,
        users: {
          [config.get<string>('SWAGGER_USER_NAME')]:
            config.get<string>('SWAGGER_PASSWORD'),
        },
      })
    );
  }

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
