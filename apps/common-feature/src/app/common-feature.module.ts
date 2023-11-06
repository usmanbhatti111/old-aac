import { Module } from '@nestjs/common';
import { SharedModule } from '@shared';
import { ContactController } from './controllers/contact.controller';
import { ContactService } from './services/contact.service';
import { DocumentsController } from './controllers/documents.controller';
import { DocumentsService } from './services/documents.service';
import { AttachmentService } from './services/attachment.service';
import { AttachmentController } from './controllers/attachment.controller';
import { ActivityLogController } from './controllers/activity-log.controller';
import { ActivityLogService } from './services/activityLog.service';

@Module({
  imports: [SharedModule],
  controllers: [
    ContactController,
    DocumentsController,
    AttachmentController,
    ActivityLogController,
    // CallsController,
  ],
  providers: [
    ContactService,
    DocumentsService,
    AttachmentService,
    ActivityLogService,
    // CallsService,
  ],
})
export class CommonFeatureModule {}
