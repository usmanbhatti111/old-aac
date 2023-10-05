import { Injectable, Logger } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { AbstractRepository } from '../../schema/abstract-repo/abstract.repository';
import { Organization } from '../../schema';

@Injectable()
export class OrganizationRepository extends AbstractRepository<Organization> {
  protected readonly logger = new Logger(OrganizationRepository.name);

  constructor(
    @InjectModel(Organization.name) organizationModel: Model<Organization>,
    @InjectConnection() connection: Connection
  ) {
    super(organizationModel, connection);
  }
}