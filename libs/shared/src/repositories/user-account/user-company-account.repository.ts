import { Injectable, Logger } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { UserCompanyAccount } from '../../schema';
import { AbstractRepository } from '../../schema/abstract-repo/abstract.repository';

@Injectable()
export class UserCompanyAccountRepository extends AbstractRepository<UserCompanyAccount> {
  protected readonly logger = new Logger(UserCompanyAccount.name);

  constructor(
    @InjectModel(UserCompanyAccount.name)
    userCompanyAccountModel: Model<UserCompanyAccount>,
    @InjectConnection() connection: Connection
  ) {
    super(userCompanyAccountModel, connection);
  }
}
