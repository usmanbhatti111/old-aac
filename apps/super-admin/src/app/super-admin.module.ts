import { Module } from '@nestjs/common';

import { SharedModule } from '@shared';
import { ExampleController } from './controllers/example.controller';
import { ExampleService } from './services/examples.service';
import { PlanController } from './controller/plan.controller';
import { PlanService } from './services/plan.services';

@Module({
  imports: [SharedModule],
  controllers: [ExampleController, PlanController],
  providers: [ExampleService, PlanService],
})
export class SuperAdminModule {}
