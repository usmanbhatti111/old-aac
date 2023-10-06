import { Injectable, Logger } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { PlanProduct } from '../schema';
import { AbstractRepository } from '../schema/abstract-repo/abstract.repository';

@Injectable()
export class PlanProductRepository extends AbstractRepository<PlanProduct> {
  protected readonly logger = new Logger(PlanProductRepository.name);

  constructor(
    @InjectModel(PlanProduct.name) planProductModel: Model<PlanProduct>,
    @InjectConnection() connection: Connection
  ) {
    super(planProductModel, connection);
  }
}
