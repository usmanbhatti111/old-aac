import { Injectable, Logger } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { AbstractRepository } from '../../schema/abstract-repo/abstract.repository';
import { SalesProduct } from '../../schema';

@Injectable()
export class SalesProductRepository extends AbstractRepository<SalesProduct> {
  protected readonly logger = new Logger(SalesProductRepository.name);

  constructor(
    @InjectModel(SalesProduct.name) organizationModel: Model<SalesProduct>,
    @InjectConnection() connection: Connection
  ) {
    super(organizationModel, connection);
  }
}
