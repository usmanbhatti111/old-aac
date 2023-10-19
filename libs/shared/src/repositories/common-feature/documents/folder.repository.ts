import { Injectable, Logger } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { AbstractRepository } from '../../../schema/abstract-repo/abstract.repository';
import { Folder } from 'libs/shared/src/schema/common-feature';

@Injectable()
export class FolderRepository extends AbstractRepository<Folder> {
  protected readonly logger = new Logger(FolderRepository.name);

  constructor(
    @InjectModel(Folder.name) folderModel: Model<Folder>,
    @InjectConnection() connection: Connection
  ) {
    super(folderModel, connection);
  }
}
