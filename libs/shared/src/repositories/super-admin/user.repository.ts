import { Injectable, Logger } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { UserO } from '../../schema';
import { AbstractRepository } from '../../schema/abstract-repo/abstract.repository';

@Injectable()
export class UserORepository extends AbstractRepository<UserO> {
  protected readonly logger = new Logger(UserORepository.name);

  constructor(
    @InjectModel(UserO.name) userModel: Model<UserO>,
    @InjectConnection() connection: Connection
  ) {
    super(userModel, connection);
  }
}
