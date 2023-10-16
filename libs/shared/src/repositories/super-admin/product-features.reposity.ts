import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { AbstractRepository } from '../../schema/abstract-repo/abstract.repository';
import { ProductFeatures } from '../../schema';

@Injectable()
export class ProductFeaturesRepository extends AbstractRepository<ProductFeatures> {
  protected readonly logger = new Logger(ProductFeaturesRepository.name);

  constructor(
    @InjectModel(ProductFeatures.name)
    productFeaturesRepository: Model<ProductFeatures>,
    @InjectConnection() connection: Connection
  ) {
    super(productFeaturesRepository, connection);
  }
}
