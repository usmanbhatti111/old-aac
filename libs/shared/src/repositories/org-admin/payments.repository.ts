import { Injectable, Logger } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { Payment, Ticket } from '../../schema';
import { AbstractRepository } from '../../schema/abstract-repo/abstract.repository';

@Injectable()
export class PaymentRepository extends AbstractRepository<Payment> {
  protected readonly logger = new Logger(PaymentRepository.name);
  constructor(
    @InjectModel(Payment.name) paymentModel: Model<Payment>,
    @InjectConnection() connection: Connection
  ) {
    super(paymentModel, connection);
  }
}
