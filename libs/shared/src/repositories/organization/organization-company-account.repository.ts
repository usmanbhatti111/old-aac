import { Injectable, Logger } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { AbstractRepository } from '../../schema/abstract-repo/abstract.repository';
import { OrganizationCompanyAccount } from '../../schema';

@Injectable()
export class OrganizationCompanyAccountRepository extends AbstractRepository<OrganizationCompanyAccount> {
  protected readonly logger = new Logger(
    OrganizationCompanyAccountRepository.name
  );

  constructor(
    @InjectModel(OrganizationCompanyAccount.name)
    organizationModel: Model<OrganizationCompanyAccount>,
    @InjectConnection() connection: Connection
  ) {
    super(organizationModel, connection);
  }
}
