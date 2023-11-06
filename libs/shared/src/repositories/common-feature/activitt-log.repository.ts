import { Injectable, Logger } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { ActivityLog, Attachment } from '../../schema';
import { AbstractRepository } from '../../schema/abstract-repo/abstract.repository';

@Injectable()
export class ActivityLogRepository extends AbstractRepository<ActivityLog> {
  protected readonly logger = new Logger(ActivityLog.name);

  constructor(
    @InjectModel(ActivityLog.name) activityLog: Model<ActivityLog>,
    @InjectConnection() connection: Connection
  ) {
    super(activityLog, connection);
  }
}
