import { Injectable, Logger } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { AbstractRepository } from '../../schema/abstract-repo/abstract.repository';
import { DealPipeline } from '../../schema';

@Injectable()
export class DealPipelineRepository extends AbstractRepository<DealPipeline> {
  protected readonly logger = new Logger(DealPipelineRepository.name);

  constructor(
    @InjectModel(DealPipeline.name) organizationModel: Model<DealPipeline>,
    @InjectConnection() connection: Connection
  ) {
    super(organizationModel, connection);
  }
}
