import { Injectable, Logger } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { AdminRole } from '../../schema';
import { AbstractRepository } from '../../schema/abstract-repo/abstract.repository';

@Injectable()
export class AdminRoleRepository extends AbstractRepository<AdminRole> {
  protected readonly logger = new Logger(AdminRoleRepository.name);

  constructor(
    @InjectModel(AdminRole.name) adminRoleModel: Model<AdminRole>,
    @InjectConnection() connection: Connection
  ) {
    super(adminRoleModel, connection);
  }
}
