import { Injectable, Logger } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { Feature, Plan } from '../../schema';
import { AbstractRepository } from '../../schema/abstract-repo/abstract.repository';

@Injectable()
export class FeatureRepository extends AbstractRepository<Feature> {
  protected readonly logger = new Logger(FeatureRepository.name);

  constructor(
    @InjectModel(Feature.name) FeatureModel: Model<Feature>,
    @InjectConnection() connection: Connection
  ) {
    super(FeatureModel, connection);
  }
}
