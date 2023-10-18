import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { ProductCategories } from '../../schema';
import { AbstractRepository } from '../../schema/abstract-repo/abstract.repository';

@Injectable()
export class ProductCategoriesRepository extends AbstractRepository<ProductCategories> {
  protected readonly logger = new Logger(ProductCategoriesRepository.name);
  constructor(
    @InjectModel(ProductCategories.name)
    productCategoriesModel: Model<ProductCategories>,
    @InjectConnection() connection: Connection
  ) {
    super(productCategoriesModel, connection);
  }
}
