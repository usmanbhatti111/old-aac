import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { PaymentService } from './services/payment.service';
import { PaymentController } from './controller/payment.controller';
import { SharedModule } from '@shared';

@Module({
  imports: [SharedModule],
  controllers: [AppController, PaymentController],
  providers: [PaymentService],
})
export class OrgAdminModule {}
