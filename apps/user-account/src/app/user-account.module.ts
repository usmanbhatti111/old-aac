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

@Module({
  imports: [SharedModule, ConfigModule.forRoot({ envFilePath: '.env' })],
  controllers: [AuthController, UserController, RequestLogController],
  providers: [
    AuthService,
    UserService,
    RequestLogService,
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
