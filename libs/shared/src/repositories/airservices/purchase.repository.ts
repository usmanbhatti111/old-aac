import { Injectable, Logger } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { AbstractRepository } from '../../schema/abstract-repo/abstract.repository';
import { Purchase } from '../../schema';

@Injectable()
export class PurchaseRepository extends AbstractRepository<Purchase> {
  protected readonly logger = new Logger(PurchaseRepository.name);

  constructor(
    @InjectModel(Purchase.name) purchaseModel: Model<Purchase>,
    @InjectConnection() connection: Connection
  ) {
    super(purchaseModel, connection);
  }
}
