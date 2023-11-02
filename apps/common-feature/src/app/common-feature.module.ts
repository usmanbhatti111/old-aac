import { Module } from '@nestjs/common';

import { SharedModule } from '@shared';
import { ContactController } from './controllers/contact.controller';
import { ContactService } from './services/contact.service';
import { DocumentsController } from './controllers/documents.controller';
import { DocumentsService } from './services/documents.service';
import { AttachmentService } from './services/attachment.service';
import { AttachmentController } from './controllers/attachment.controller';
// import { CallsController } from './controllers/calls.controller';
// import { CallsService } from './services/calls.service';
// import { TwilioModule } from 'nestjs-twilio';

@Module({
  imports: [
    SharedModule,
    // TwilioModule.forRoot({
    //   accountSid: process.env.TWILIO_ACCOUNT_SID,
    //   authToken: process.env.TWILIO_AUTH_TOKEN,
    // }),
  ],
  controllers: [
    ContactController,
    DocumentsController,
    AttachmentController,
    // CallsController,
  ],
  providers: [
    ContactService,
    DocumentsService,
    AttachmentService,
    // CallsService,
  ],
})
export class CommonFeatureModule {}
