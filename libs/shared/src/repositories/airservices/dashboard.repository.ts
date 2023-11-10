import { Injectable, Logger } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { AbstractRepository } from '../../schema/abstract-repo/abstract.repository';
import { Dashboard } from '../../schema/air-services/dashboard.schema';

@Injectable()
export class DashboardRepository extends AbstractRepository<Dashboard> {
  protected readonly logger = new Logger(DashboardRepository.name);

  constructor(
    @InjectModel(Dashboard.name) DashboardModel: Model<Dashboard>,
    @InjectConnection() connection: Connection
  ) {
    super(DashboardModel, connection);
  }
}
