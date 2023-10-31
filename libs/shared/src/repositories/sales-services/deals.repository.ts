import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { AbstractRepository } from '../../schema/abstract-repo/abstract.repository';
import { Deals } from '../../schema';

@Injectable()
export class DealsRepository extends AbstractRepository<Deals> {
  protected readonly logger = new Logger(DealsRepository.name);
  constructor(
    @InjectModel(Deals.name)
    dealsRepositoryModel: Model<Deals>,
    @InjectConnection() connection: Connection
  ) {
    super(dealsRepositoryModel, connection);
  }
}
