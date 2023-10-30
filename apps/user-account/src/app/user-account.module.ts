import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { SharedModule } from '@shared';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CognitoIdentityServiceProvider } from 'aws-sdk';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { RequestLogController } from './controllers/request-log.controller';
import { RequestLogService } from './services/request-log.service';
import { HttpModule } from '@nestjs/axios';
import { CompanyHouseService } from './services/company-house.service';
import { CompanyHouseController } from './controllers/company-house.controller';

@Module({
  imports: [
    SharedModule,
    HttpModule,
    ConfigModule.forRoot({ envFilePath: '.env' }),
  ],
  controllers: [
    AuthController,
    UserController,
    RequestLogController,
    CompanyHouseController,
  ],
  providers: [
    AuthService,
    UserService,
    RequestLogService,
    CompanyHouseService,
    {
      provide: 'CognitoIDP',
      inject: [ConfigService],
      useFactory: (config: ConfigService) =>
        new CognitoIdentityServiceProvider({
          region: config.get<string>('COGNITO_REGION'),
          accessKeyId: config.get<string>('COGNITO_ACCESS_KEY'),
          secretAccessKey: config.get<string>('COGNITO_SECRET_KEY'),
        }),
    },
  ],
})
export class UserAccountModule {}
