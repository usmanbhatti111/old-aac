import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { SharedModule } from '@shared';

@Module({
  imports: [SharedModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class UserAccountModule {}
