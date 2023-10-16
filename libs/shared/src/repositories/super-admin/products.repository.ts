import { Injectable, Logger } from '@nestjs/common';
import { AbstractRepository } from '../../schema/abstract-repo/abstract.repository';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { Products } from '../../schema/super-admin';

@Injectable()
export class ProductsRepository extends AbstractRepository<Products> {
  protected readonly logger = new Logger(ProductsRepository.name);

  constructor(
    @InjectModel(Products.name) productsModel: Model<Products>,
    @InjectConnection() connection: Connection
  ) {
    super(productsModel, connection);
  }
}
