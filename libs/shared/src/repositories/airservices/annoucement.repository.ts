import { Injectable, Logger } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { Annoucement } from '../../schema';
import { AbstractRepository } from '../../schema/abstract-repo/abstract.repository';

@Injectable()
export class AnnoucementRepository extends AbstractRepository<Annoucement> {
  protected readonly logger = new Logger(AnnoucementRepository.name);

  constructor(
    @InjectModel(Annoucement.name) annoucementModel: Model<Annoucement>,
    @InjectConnection() connection: Connection
  ) {
    super(annoucementModel, connection);
  }
}
