import { Injectable, Logger } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { Expense } from '../../schema';
import { AbstractRepository } from '../../schema/abstract-repo/abstract.repository';

@Injectable()
export class ExpenseRepository extends AbstractRepository<Expense> {
  protected readonly logger = new Logger(ExpenseRepository.name);

  constructor(
    @InjectModel(Expense.name) expnseModel: Model<Expense>,
    @InjectConnection() connection: Connection
  ) {
    super(expnseModel, connection);
  }
}
