import { Injectable, Logger } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { Articles } from '../../schema';
import { AbstractRepository } from '../../schema/abstract-repo/abstract.repository';

@Injectable()
export class ArticlesRepository extends AbstractRepository<Articles> {
  protected readonly logger = new Logger(ArticlesRepository.name);

  constructor(
    @InjectModel(Articles.name) articlesModel: Model<Articles>,
    @InjectConnection() connection: Connection
  ) {
    super(articlesModel, connection);
  }
}
