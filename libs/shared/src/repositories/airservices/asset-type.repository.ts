import { Injectable, Logger } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { AssetType } from '../../schema';
import { AbstractRepository } from '../../schema/abstract-repo/abstract.repository';

@Injectable()
export class AssetTypeRepository extends AbstractRepository<AssetType> {
  protected readonly logger = new Logger(AssetTypeRepository.name);

  constructor(
    @InjectModel(AssetType.name) assettypeModel: Model<AssetType>,
    @InjectConnection() connection: Connection
  ) {
    super(assettypeModel, connection);
  }
}
