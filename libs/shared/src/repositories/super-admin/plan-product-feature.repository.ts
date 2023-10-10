import { Injectable, Logger } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { PlanProductFeature } from '../../schema';
import { AbstractRepository } from '../../schema/abstract-repo/abstract.repository';

@Injectable()
export class PlanProductFeatureRepository extends AbstractRepository<PlanProductFeature> {
  protected readonly logger = new Logger(PlanProductFeatureRepository.name);

  constructor(
    @InjectModel(PlanProductFeature.name)
    planProductFeatureModel: Model<PlanProductFeature>,
    @InjectConnection() connection: Connection
  ) {
    super(planProductFeatureModel, connection);
  }
}
