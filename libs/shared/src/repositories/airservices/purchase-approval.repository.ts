import { Injectable, Logger } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { AbstractRepository } from '../../schema/abstract-repo/abstract.repository';
import { PurchaseApproval } from '../../schema';

@Injectable()
export class PurchaseApprovalRepository extends AbstractRepository<PurchaseApproval> {
  protected readonly logger = new Logger(PurchaseApprovalRepository.name);

  constructor(
    @InjectModel(PurchaseApproval.name) purchaseModel: Model<PurchaseApproval>,
    @InjectConnection() connection: Connection
  ) {
    super(purchaseModel, connection);
  }
}
