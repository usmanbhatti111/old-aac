import { Injectable, Logger } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { AbstractRepository } from '../../schema/abstract-repo/abstract.repository';
import { CompanyAccountRole } from '../../schema';

@Injectable()
export class CompanyAccountRoleRepository extends AbstractRepository<CompanyAccountRole> {
  protected readonly logger = new Logger(CompanyAccountRoleRepository.name);

  constructor(
    @InjectModel(CompanyAccountRole.name)
    CompanyAccountRoleModel: Model<CompanyAccountRole>,
    @InjectConnection() connection: Connection
  ) {
    super(CompanyAccountRoleModel, connection);
  }
}
