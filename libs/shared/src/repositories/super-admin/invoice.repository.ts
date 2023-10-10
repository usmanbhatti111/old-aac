import { Injectable, Logger } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { Invoice } from '../../schema';
import { AbstractRepository } from '../../schema/abstract-repo/abstract.repository';

@Injectable()
export class InvoiceRepository extends AbstractRepository<Invoice> {
  protected readonly logger = new Logger(InvoiceRepository.name);

  constructor(
    @InjectModel(Invoice.name) invoiceModel: Model<Invoice>,
    @InjectConnection() connection: Connection
  ) {
    super(invoiceModel, connection);
  }
}
