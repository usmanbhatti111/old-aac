import { Injectable, Logger } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { AbstractRepository } from '../../../schema/abstract-repo/abstract.repository';
import { ContactMeeting } from '@shared/schemas';

@Injectable()
export class ContactMeetingRepository extends AbstractRepository<ContactMeeting> {
  protected readonly logger = new Logger(ContactMeetingRepository.name);

  constructor(
    @InjectModel(ContactMeeting.name)
    ContactMeetingModel: Model<ContactMeeting>,
    @InjectConnection() connection: Connection
  ) {
    super(ContactMeetingModel, connection);
  }
}
