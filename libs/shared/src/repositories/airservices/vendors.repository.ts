import { Injectable, Logger } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { Vendor } from '../../schema';
import { AbstractRepository } from '../../schema/abstract-repo/abstract.repository';

@Injectable()
export class VendorsRepository extends AbstractRepository<Vendor> {
  protected readonly logger = new Logger(VendorsRepository.name);

  constructor(
    @InjectModel(Vendor.name) vendorModel: Model<Vendor>,
    @InjectConnection() connection: Connection
  ) {
    super(vendorModel, connection);
  }
}
