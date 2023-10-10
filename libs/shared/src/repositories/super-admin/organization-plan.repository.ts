import { Injectable, Logger } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { OrganizationPlan } from '../../schema';
import { AbstractRepository } from '../../schema/abstract-repo/abstract.repository';

@Injectable()
export class OrganizationPlanRepository extends AbstractRepository<OrganizationPlan> {
  protected readonly logger = new Logger(OrganizationPlanRepository.name);

  constructor(
    @InjectModel(OrganizationPlan.name) invoiceModel: Model<OrganizationPlan>,
    @InjectConnection() connection: Connection
  ) {
    super(invoiceModel, connection);
  }
}
