import { Injectable, Logger } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { AbstractRepository } from '../../../schema/abstract-repo/abstract.repository';
import { Contact } from '../../../schema/common-feature';

@Injectable()
export class ContactRepository extends AbstractRepository<Contact> {
  protected readonly logger = new Logger(ContactRepository.name);

  constructor(
    @InjectModel(Contact.name) ContactModel: Model<Contact>,
    @InjectConnection() connection: Connection
  ) {
    super(ContactModel, connection);
  }
}
