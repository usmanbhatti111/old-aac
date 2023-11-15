import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { JobApplications } from '../../schema';
import { AbstractRepository } from '../../schema/abstract-repo/abstract.repository';

@Injectable()
export class JobApplicationsRepository extends AbstractRepository<JobApplications> {
  protected readonly logger = new Logger(JobApplicationsRepository.name);

  constructor(
    @InjectModel(JobApplications.name)
    jobApplicationsModel: Model<JobApplications>,
    @InjectConnection() connection: Connection
  ) {
    super(jobApplicationsModel, connection);
  }
}
