import { Injectable, Logger } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { AbstractRepository } from '../../schema/abstract-repo/abstract.repository';
import { TaskActivity } from '../../schema/air-services/task-activity.schema';

@Injectable()
export class TaskActivityRepository extends AbstractRepository<TaskActivity> {
  protected readonly logger = new Logger(TaskActivityRepository.name);

  constructor(
    @InjectModel(TaskActivity.name) taskActivityModel: Model<TaskActivity>,
    @InjectConnection() connection: Connection
  ) {
    super(taskActivityModel, connection);
  }
}
