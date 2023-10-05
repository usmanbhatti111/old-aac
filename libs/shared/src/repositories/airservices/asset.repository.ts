import { Injectable, Logger } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { AbstractRepository } from '../../schema/abstract-repo/abstract.repository';
import { Asset } from '../../schema';

@Injectable()
export class AssetRepository extends AbstractRepository<Asset> {
  protected readonly logger = new Logger(AssetRepository.name);

  constructor(
    @InjectModel(Asset.name) assetModel: Model<Asset>,
    @InjectConnection() connection: Connection
  ) {
    super(assetModel, connection);
  }
}
