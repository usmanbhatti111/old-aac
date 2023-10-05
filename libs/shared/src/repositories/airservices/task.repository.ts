import { Injectable, Logger } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { AbstractRepository } from '../../schema/abstract-repo/abstract.repository';
import { Task } from '../../schema';

@Injectable()
export class TaskRepository extends AbstractRepository<Task> {
  protected readonly logger = new Logger(TaskRepository.name);

  constructor(
    @InjectModel(Task.name) taskModel: Model<Task>,
    @InjectConnection() connection: Connection
  ) {
    super(taskModel, connection);
  }
}
