import { Injectable, Logger } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { Ticket } from '../../schema';
import { AbstractRepository } from '../../schema/abstract-repo/abstract.repository';

@Injectable()
export class TicketRepository extends AbstractRepository<Ticket> {
  protected readonly logger = new Logger(TicketRepository.name);

  constructor(
    @InjectModel(Ticket.name) ticketModel: Model<Ticket>,
    @InjectConnection() connection: Connection
  ) {
    super(ticketModel, connection);
  }
}
