import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { CustomizeColumns } from '../../schema';
import { AbstractRepository } from '../../schema/abstract-repo/abstract.repository';

@Injectable()
export class CustomizeColumnsRepository extends AbstractRepository<CustomizeColumns> {
  protected readonly logger = new Logger(CustomizeColumnsRepository.name);

  constructor(
    @InjectModel(CustomizeColumns.name)
    customizeColumns: Model<CustomizeColumns>,
    @InjectConnection() connection: Connection
  ) {
    super(customizeColumns, connection);
  }
}
