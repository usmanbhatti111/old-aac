import { Injectable, Logger } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { AbstractRepository } from '../../schema/abstract-repo/abstract.repository';
import { RequestLog } from '../../schema';

@Injectable()
export class RequestLogRepository extends AbstractRepository<RequestLog> {
  protected readonly logger = new Logger(RequestLogRepository.name);

  constructor(
    @InjectModel(RequestLog.name) requestLogModel: Model<RequestLog>,
    @InjectConnection() connection: Connection
  ) {
    super(requestLogModel, connection);
  }
}
