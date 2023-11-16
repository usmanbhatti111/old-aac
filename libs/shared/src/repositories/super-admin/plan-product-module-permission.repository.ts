import { Injectable, Logger } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { PlanProductPermission } from '../../schema';
import { AbstractRepository } from '../../schema/abstract-repo/abstract.repository';

@Injectable()
export class PlanProductPermissionRepository extends AbstractRepository<PlanProductPermission> {
  protected readonly logger = new Logger(PlanProductPermissionRepository.name);

  constructor(
    @InjectModel(PlanProductPermission.name)
    productModulePermissionModel: Model<PlanProductPermission>,
    @InjectConnection() connection: Connection
  ) {
    super(productModulePermissionModel, connection);
  }
}
