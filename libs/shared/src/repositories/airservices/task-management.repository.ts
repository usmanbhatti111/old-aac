import { Injectable, Logger } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { AbstractRepository } from '../../schema/abstract-repo/abstract.repository';
import { TaskManagement } from '../../schema';

@Injectable()
export class TaskManagementRepository extends AbstractRepository<TaskManagement> {
  protected readonly logger = new Logger(TaskManagementRepository.name);

  constructor(
    @InjectModel(TaskManagement.name)
    taskManagementModel: Model<TaskManagement>,
    @InjectConnection() connection: Connection
  ) {
    super(taskManagementModel, connection);
  }
}
