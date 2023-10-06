import { Injectable, Logger } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { Plan } from '../schema';
import { AbstractRepository } from '../schema/abstract-repo/abstract.repository';

@Injectable()
export class PlanRepository extends AbstractRepository<Plan> {
  protected readonly logger = new Logger(PlanRepository.name);

  constructor(
    @InjectModel(Plan.name) planModel: Model<Plan>,
    @InjectConnection() connection: Connection
  ) {
    super(planModel, connection);
  }
}
