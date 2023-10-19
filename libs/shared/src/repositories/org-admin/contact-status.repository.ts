import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { ContactStatus } from '../../schema';
import { AbstractRepository } from '../../schema/abstract-repo/abstract.repository';

@Injectable()
export class ContactStateRepository extends AbstractRepository<ContactStatus> {
  protected readonly logger = new Logger(ContactStateRepository.name);
  constructor(
    @InjectModel(ContactStatus.name) contactStatusModel: Model<ContactStatus>,
    @InjectConnection() connection: Connection
  ) {
    super(contactStatusModel, connection);
  }
}
