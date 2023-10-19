import { Injectable, Logger } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { AbstractRepository } from '../../../schema/abstract-repo/abstract.repository';
import { Contact, ContactNote } from '../../../schema/common-feature';

@Injectable()
export class ContactNoteRepository extends AbstractRepository<ContactNote> {
  protected readonly logger = new Logger(ContactNoteRepository.name);

  constructor(
    @InjectModel(ContactNote.name) ContactNoteModel: Model<ContactNote>,
    @InjectConnection() connection: Connection
  ) {
    super(ContactNoteModel, connection);
  }
}
