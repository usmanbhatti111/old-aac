import { Injectable, Logger } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { PlanProductModule } from '../../schema';
import { AbstractRepository } from '../../schema/abstract-repo/abstract.repository';

@Injectable()
export class PlanProductModuleRepository extends AbstractRepository<PlanProductModule> {
  protected readonly logger = new Logger(PlanProductModuleRepository.name);

  constructor(
    @InjectModel(PlanProductModule.name)
    planProductModuleModel: Model<PlanProductModule>,
    @InjectConnection() connection: Connection
  ) {
    super(planProductModuleModel, connection);
  }
}
