import { Module } from '@nestjs/common';

import { SharedModule } from '@shared';
import { ContactController } from './controllers/contact.controller';
import { ContactService } from './services/contact.service';

@Module({
  imports: [SharedModule],
  controllers: [ContactController],
  providers: [ContactService],
})
export class CommonFeatureModule {}
