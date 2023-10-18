import { Injectable, Logger } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { Contract } from '../../schema';
import { AbstractRepository } from '../../schema/abstract-repo/abstract.repository';

@Injectable()
export class ContractRepository extends AbstractRepository<Contract> {
  protected readonly logger = new Logger(ContractRepository.name);

  constructor(
    @InjectModel(Contract.name) contractModel: Model<Contract>,
    @InjectConnection() connection: Connection
  ) {
    super(contractModel, connection);
  }
}
