import { Injectable, Logger } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Activitylogs } from '@shared/schemas';
import { AbstractRepository } from 'libs/shared/src/schema/abstract-repo/abstract.repository';
import { Model, Connection } from 'mongoose';

@Injectable()
export class ActivitylogsRepository extends AbstractRepository<Activitylogs> {
  protected readonly logger = new Logger(ActivitylogsRepository.name);
  constructor(
    @InjectModel(Activitylogs.name) activitylogsModel: Model<Activitylogs>,
    @InjectConnection() connection: Connection
  ) {
    super(activitylogsModel, connection);
  }
}
