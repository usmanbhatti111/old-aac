import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { LifecycleStages } from '../../schema';
import { AbstractRepository } from '../../schema/abstract-repo/abstract.repository';

@Injectable()
export class LifecycleStagesRepository extends AbstractRepository<LifecycleStages> {
  protected readonly logger = new Logger(LifecycleStagesRepository.name);
  constructor(
    @InjectModel(LifecycleStages.name)
    lifecycleStagesRepositoryModel: Model<LifecycleStages>,
    @InjectConnection() connection: Connection
  ) {
    super(lifecycleStagesRepositoryModel, connection);
  }
}
