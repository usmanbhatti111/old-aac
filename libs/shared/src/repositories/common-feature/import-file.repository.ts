import { Injectable, Logger } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { ImportFile } from '../../schema';
import { AbstractRepository } from '../../schema/abstract-repo/abstract.repository';

@Injectable()
export class ImportFileRepository extends AbstractRepository<ImportFile> {
  protected readonly logger = new Logger(ImportFileRepository.name);

  constructor(
    @InjectModel(ImportFile.name)
    importFile: Model<ImportFile>,
    @InjectConnection() connection: Connection
  ) {
    super(importFile, connection);
  }
}
