import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { AbstractRepository } from '../../schema/abstract-repo/abstract.repository';
import { NewsAndEvent } from '../../schema/super-admin';

@Injectable()
export class NewsAndEventRepository extends AbstractRepository<NewsAndEvent> {
  protected readonly logger = new Logger(NewsAndEventRepository.name);

  constructor(
    @InjectModel(NewsAndEvent.name) newsAndEventModel: Model<NewsAndEvent>,
    @InjectConnection() connection: Connection
  ) {
    super(newsAndEventModel, connection);
  }
}
