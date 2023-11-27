import { Injectable, Logger } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { AbstractRepository } from 'libs/shared/src/schema/abstract-repo/abstract.repository';
import { Model, Connection } from 'mongoose';
import { ScheduleCalls } from '../../../schema';

@Injectable()
export class ScheduleCallRepository extends AbstractRepository<ScheduleCalls> {
  protected readonly logger = new Logger(ScheduleCallRepository.name);
  constructor(
    @InjectModel(ScheduleCalls.name) scheduleCallsModel: Model<ScheduleCalls>,
    @InjectConnection() connection: Connection
  ) {
    super(scheduleCallsModel, connection);
  }
}
