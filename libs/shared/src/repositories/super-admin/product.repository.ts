import { Injectable, Logger } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { Products } from '../../schema';
import { AbstractRepository } from '../../schema/abstract-repo/abstract.repository';

@Injectable()
export class ProductRepository extends AbstractRepository<Products> {
  protected readonly logger = new Logger(ProductRepository.name);

  constructor(
    @InjectModel(Products.name) productModel: Model<Products>,
    @InjectConnection() connection: Connection
  ) {
    super(productModel, connection);
  }
}
