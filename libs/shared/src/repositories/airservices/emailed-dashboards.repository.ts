import { Injectable, Logger } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { AbstractRepository } from '../../schema/abstract-repo/abstract.repository';
import { EmailedDashboards } from '../../schema/air-services';

@Injectable()
export class EmailedDashboardsRepository extends AbstractRepository<EmailedDashboards> {
  protected readonly logger = new Logger(EmailedDashboardsRepository.name);

  constructor(
    @InjectModel(EmailedDashboards.name)
    EmailedDashboardsModel: Model<EmailedDashboards>,
    @InjectConnection() connection: Connection
  ) {
    super(EmailedDashboardsModel, connection);
  }
}
