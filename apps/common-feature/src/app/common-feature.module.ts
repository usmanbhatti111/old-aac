import { Module } from '@nestjs/common';

import { SharedModule } from '@shared';
import { ContactController } from './controllers/contact.controller';
import { ContactService } from './services/contact.service';
import { DocumentsController } from './controllers/documents.controller';
import { DocumentsService } from './services/documents.service';

@Module({
  imports: [SharedModule],
  controllers: [ContactController, DocumentsController],
  providers: [ContactService, DocumentsService],
})
export class CommonFeatureModule {}
