import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { AbstractRepository } from '../../schema/abstract-repo/abstract.repository';
import { Enquiries } from '../../schema/super-admin';

@Injectable()
export class EnquiriesRepository extends AbstractRepository<Enquiries> {
  protected readonly logger = new Logger(EnquiriesRepository.name);

  constructor(
    @InjectModel(Enquiries.name) enquiriesModel: Model<Enquiries>,
    @InjectConnection() connection: Connection
  ) {
    super(enquiriesModel, connection);
  }
}
