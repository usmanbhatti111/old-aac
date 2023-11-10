import { Injectable, Logger } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { AbstractRepository } from '../../schema/abstract-repo/abstract.repository';
import { SoftwareUsers } from '../../schema';

@Injectable()
export class SoftwareUsersRepository extends AbstractRepository<SoftwareUsers> {
  protected readonly logger = new Logger(SoftwareUsersRepository.name);

  constructor(
    @InjectModel(SoftwareUsers.name) softwareUsersModel: Model<SoftwareUsers>,
    @InjectConnection() connection: Connection
  ) {
    super(softwareUsersModel, connection);
  }
}
