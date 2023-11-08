import { Injectable, Logger } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { AbstractRepository } from '../../schema/abstract-repo/abstract.repository';
import { ReportsWidget } from '../../schema/air-services/reports-widgets.schema';

@Injectable()
export class ReportsWidgetRepository extends AbstractRepository<ReportsWidget> {
  protected readonly logger = new Logger(ReportsWidgetRepository.name);

  constructor(
    @InjectModel(ReportsWidget.name) reportsWidgetModel: Model<ReportsWidget>,
    @InjectConnection() connection: Connection
  ) {
    super(reportsWidgetModel, connection);
  }
}
