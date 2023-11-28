import { Injectable, Logger } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { Articles, ProductCatalog } from '../../schema';
import { AbstractRepository } from '../../schema/abstract-repo/abstract.repository';

@Injectable()
export class ProductCatalogRepository extends AbstractRepository<ProductCatalog> {
  protected readonly logger = new Logger(ProductCatalogRepository.name);

  constructor(
    @InjectModel(ProductCatalog.name)
    productCatalogModel: Model<ProductCatalog>,
    @InjectConnection() connection: Connection
  ) {
    super(productCatalogModel, connection);
  }
}
