import { Injectable, Logger } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { AbstractRepository } from '../../../schema/abstract-repo/abstract.repository';
import { File } from 'libs/shared/src/schema/common-feature';

@Injectable()
export class FileRepository extends AbstractRepository<File> {
  protected readonly logger = new Logger(FileRepository.name);

  constructor(
    @InjectModel(File.name) fileModel: Model<File>,
    @InjectConnection() connection: Connection
  ) {
    super(fileModel, connection);
  }
}
