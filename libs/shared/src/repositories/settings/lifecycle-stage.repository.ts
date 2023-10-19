import { Injectable, Logger } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { AbstractRepository } from '../../schema/abstract-repo/abstract.repository';
import { LifeCycleStage } from '../../schema';

@Injectable()
export class LifeCycleStageRepository extends AbstractRepository<LifeCycleStage> {
  protected readonly logger = new Logger(LifeCycleStageRepository.name);

  constructor(
    @InjectModel(LifeCycleStage.name)
    LifeCycleStageModel: Model<LifeCycleStage>,
    @InjectConnection() connection: Connection
  ) {
    super(LifeCycleStageModel, connection);
  }
}
