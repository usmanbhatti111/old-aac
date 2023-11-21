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
import { DropdownService } from './services/dropdown.service';
import { DropdownController } from './controllers/dropdown.controller';
import { CompaniesService } from './services/companies.services';
import { CompaniesController } from './controllers/companies.controller';
import { NoteController } from './controllers/note.controller';
import { NoteService } from './services/note.service';

@Module({
  imports: [SharedModule],
  controllers: [
    ContactController,
    DocumentsController,
    AttachmentController,
    ActivitylogsController,
    ActivityLogController,
    DropdownController,
    // CallsController,
    CompaniesController,
    NoteController,
  ],
  providers: [
    ContactService,
    DocumentsService,
    AttachmentService,
    ActivitylogsService,
    ActivityLogService,
    DropdownService,
    // CallsService,
    CompaniesService,
    NoteService,
  ],
})
export class CommonFeatureModule {}
