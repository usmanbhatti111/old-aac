import { Injectable, Logger } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { AbstractRepository } from '../../schema/abstract-repo/abstract.repository';
import { SendDashboard } from '../../schema';

@Injectable()
export class SendDashboardRepository extends AbstractRepository<SendDashboard> {
  protected readonly logger = new Logger(SendDashboardRepository.name);

  constructor(
    @InjectModel(SendDashboard.name) SendDashboardModel: Model<SendDashboard>,
    @InjectConnection() connection: Connection
  ) {
    super(SendDashboardModel, connection);
  }
}
