import { Injectable, Logger } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { AbstractRepository } from '../../schema/abstract-repo/abstract.repository';
import { Inventory } from '../../schema';

@Injectable()
export class InventoryRepository extends AbstractRepository<Inventory> {
  protected readonly logger = new Logger(InventoryRepository.name);

  constructor(
    @InjectModel(Inventory.name) inventoryModel: Model<Inventory>,
    @InjectConnection() connection: Connection
  ) {
    super(inventoryModel, connection);
  }
}
