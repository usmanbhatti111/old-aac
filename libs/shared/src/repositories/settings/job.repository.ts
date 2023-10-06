import { Injectable, Logger } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { AbstractRepository } from '../../schema/abstract-repo/abstract.repository';
import { Job } from '../../schema';

@Injectable()
export class JobRepository extends AbstractRepository<Job> {
  protected readonly logger = new Logger(JobRepository.name);

  constructor(
    @InjectModel(Job.name) jobModel: Model<Job>,
    @InjectConnection() connection: Connection
  ) {
    super(jobModel, connection);
  }
}
