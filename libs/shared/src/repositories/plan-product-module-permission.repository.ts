import { Injectable, Logger } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { PlanProductModule, PlanProductModulePermission } from '../schema';
import { AbstractRepository } from '../schema/abstract-repo/abstract.repository';

@Injectable()
export class PlanProductModulePermissionRepository extends AbstractRepository<PlanProductModulePermission> {
  protected readonly logger = new Logger(
    PlanProductModulePermissionRepository.name
  );

  constructor(
    @InjectModel(PlanProductModulePermission.name)
    planProductModulePermissionModel: Model<PlanProductModulePermission>,
    @InjectConnection() connection: Connection
  ) {
    super(planProductModulePermissionModel, connection);
  }
}
