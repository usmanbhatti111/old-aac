import { Injectable, Logger } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { AbstractRepository } from '../../schema/abstract-repo/abstract.repository';
import { Faq } from '../../schema';

@Injectable()
export class FaqRepository extends AbstractRepository<Faq> {
  protected readonly logger = new Logger(FaqRepository.name);

  constructor(
    @InjectModel(Faq.name) faqModel: Model<Faq>,
    @InjectConnection() connection: Connection
  ) {
    super(faqModel, connection);
  }
}
