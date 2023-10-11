import { Injectable, Logger } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { AssetsSoftware, Ticket } from '../../schema';
import { AbstractRepository } from '../../schema/abstract-repo/abstract.repository';

@Injectable()
export class AssetsSoftwareRepository extends AbstractRepository<AssetsSoftware> {
  protected readonly logger = new Logger(AssetsSoftwareRepository.name);

  constructor(
    @InjectModel(AssetsSoftware.name)
    assetsSoftwareModel: Model<AssetsSoftware>,
    @InjectConnection() connection: Connection
  ) {
    super(assetsSoftwareModel, connection);
  }
}
