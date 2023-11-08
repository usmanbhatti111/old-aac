import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { DealViews } from '../../schema';
import { AbstractRepository } from '../../schema/abstract-repo/abstract.repository';

@Injectable()
export class DealViewsRepository extends AbstractRepository<DealViews> {
  protected readonly logger = new Logger(DealViewsRepository.name);
  constructor(
    @InjectModel(DealViews.name)
    dealViewsRepositoryModel: Model<DealViews>,
    @InjectConnection() connection: Connection
  ) {
    super(dealViewsRepositoryModel, connection);
  }
}
