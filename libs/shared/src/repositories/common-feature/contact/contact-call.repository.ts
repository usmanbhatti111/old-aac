import { Injectable, Logger } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { AbstractRepository } from '../../../schema/abstract-repo/abstract.repository';
import { ContactCall } from '../../../schema/common-feature';

@Injectable()
export class ContactCallRepository extends AbstractRepository<ContactCall> {
  protected readonly logger = new Logger(ContactCallRepository.name);

  constructor(
    @InjectModel(ContactCall.name) ContactCallModel: Model<ContactCall>,
    @InjectConnection() connection: Connection
  ) {
    super(ContactCallModel, connection);
  }
}
