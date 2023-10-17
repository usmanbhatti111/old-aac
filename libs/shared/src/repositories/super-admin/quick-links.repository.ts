import { Injectable, Logger } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { Invoice, QuickLinks } from '../../schema';
import { AbstractRepository } from '../../schema/abstract-repo/abstract.repository';

@Injectable()
export class QuickLinksRepository extends AbstractRepository<QuickLinks> {
  protected readonly logger = new Logger(QuickLinksRepository.name);

  constructor(
    @InjectModel(QuickLinks.name) invoiceModel: Model<QuickLinks>,
    @InjectConnection() connection: Connection
  ) {
    super(invoiceModel, connection);
  }
}
