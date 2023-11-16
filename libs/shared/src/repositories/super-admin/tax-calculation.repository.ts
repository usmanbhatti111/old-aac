import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { TaxCalculation } from '../../schema';
import { AbstractRepository } from '../../schema/abstract-repo/abstract.repository';

@Injectable()
export class TaxCalculationRepository extends AbstractRepository<TaxCalculation> {
  protected readonly logger = new Logger(TaxCalculationRepository.name);

  constructor(
    @InjectModel(TaxCalculation.name)
    taxCalculationModel: Model<TaxCalculation>,
    @InjectConnection() connection: Connection
  ) {
    super(taxCalculationModel, connection);
  }
}
