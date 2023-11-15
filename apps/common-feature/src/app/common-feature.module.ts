import { Module } from '@nestjs/common';
import { SharedModule } from '@shared';
import { ContactController } from './controllers/contact.controller';
import { ContactService } from './services/contact.service';
import { DocumentsController } from './controllers/documents.controller';
import { DocumentsService } from './services/documents.service';
import { AttachmentService } from './services/attachment.service';
import { AttachmentController } from './controllers/attachment.controller';
import { ActivitylogsService } from './services/activitylogs.service';
import { ActivitylogsController } from './controllers/activitylogs.controller';
// import { CallsController } from './controllers/calls.controller';
// import { CallsService } from './services/calls.service';
// import { TwilioModule } from 'nestjs-twilio';
import { ActivityLogController } from './controllers/activity-log.controller';
import { ActivityLogService } from './services/activityLog.service';
import { CustomizedColumnsController } from './controllers/customize-columns.controller';

@Module({
  imports: [SharedModule],
  controllers: [
    ContactController,
    DocumentsController,
    AttachmentController,
    ActivitylogsController,
    ActivityLogController,
    // CallsController,
    CustomizedColumnsController,
  ],
  providers: [
    ContactService,
    DocumentsService,
    AttachmentService,
    ActivitylogsService,
    ActivityLogService,
    // CallsService,
  ],
})
export class CommonFeatureModule {}
