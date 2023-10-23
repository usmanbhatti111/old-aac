import { Injectable, Logger } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { Attachment } from '../../schema';
import { AbstractRepository } from '../../schema/abstract-repo/abstract.repository';

@Injectable()
export class AttachmentAirRepository extends AbstractRepository<Attachment> {
  protected readonly logger = new Logger(AttachmentAirRepository.name);

  constructor(
    @InjectModel(Attachment.name)
    attachment: Model<Attachment>,
    @InjectConnection() connection: Connection
  ) {
    super(attachment, connection);
  }
}
