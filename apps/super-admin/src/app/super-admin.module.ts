import { Module } from '@nestjs/common';

import { SharedModule } from '@shared';
import { ExampleController } from './controllers/example.controller';
import { ExampleService } from './services/examples.service';

@Module({
  imports: [SharedModule],
  controllers: [ExampleController],
  providers: [ExampleService],
})
export class SuperAdminModule {}
