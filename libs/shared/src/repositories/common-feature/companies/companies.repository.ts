import { Injectable, Logger } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Company } from '@shared/schemas';
import { AbstractRepository } from 'libs/shared/src/schema/abstract-repo/abstract.repository';
import { Model, Connection } from 'mongoose';

@Injectable()
export class CompanyRepository extends AbstractRepository<Company> {
  protected readonly logger = new Logger(CompanyRepository.name);
  constructor(
    @InjectModel(Company.name) companiesModel: Model<Company>,
    @InjectConnection() connection: Connection
  ) {
    super(companiesModel, connection);
  }
}
