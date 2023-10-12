import { Injectable, Logger } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { Permission, Plan } from '../../schema';
import { AbstractRepository } from '../../schema/abstract-repo/abstract.repository';

@Injectable()
export class PermissionRepository extends AbstractRepository<Permission> {
  protected readonly logger = new Logger(PermissionRepository.name);

  constructor(
    @InjectModel(Permission.name) PermissionModel: Model<Permission>,
    @InjectConnection() connection: Connection
  ) {
    super(PermissionModel, connection);
  }
}
