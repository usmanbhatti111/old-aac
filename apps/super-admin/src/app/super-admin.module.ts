import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { SharedModule } from '@shared';
import { PlanController } from './controller/plan.controller';
import { PlanService } from './services/plan.services';

@Module({
  imports: [SharedModule],
  controllers: [AppController, PlanController],
  providers: [PlanService],
})
export class SuperAdminModule {}
