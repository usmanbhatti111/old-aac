import { Injectable, Logger } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { UserAccounts } from '../../schema';
import { AbstractRepository } from '../../schema/abstract-repo/abstract.repository';

@Injectable()
export class UserAccountsRepository extends AbstractRepository<UserAccounts> {
  protected readonly logger = new Logger(UserAccountsRepository.name);

  constructor(
    @InjectModel(UserAccounts.name) userAccountsModel: Model<UserAccounts>,
    @InjectConnection() connection: Connection
  ) {
    super(userAccountsModel, connection);
  }
}
