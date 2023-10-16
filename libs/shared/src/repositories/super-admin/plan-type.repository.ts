import { Injectable, Logger } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { PlanType } from '../../schema';
import { AbstractRepository } from '../../schema/abstract-repo/abstract.repository';

@Injectable()
export class PlanTypeRepository extends AbstractRepository<PlanType> {
  protected readonly logger = new Logger(PlanTypeRepository.name);

  constructor(
    @InjectModel(PlanType.name) planTypeModel: Model<PlanType>,
    @InjectConnection() connection: Connection
  ) {
    super(planTypeModel, connection);
  }
}
