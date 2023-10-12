import { Injectable, Logger } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { Module } from '../../schema';
import { AbstractRepository } from '../../schema/abstract-repo/abstract.repository';

@Injectable()
export class ModuleRepository extends AbstractRepository<Module> {
  protected readonly logger = new Logger(ModuleRepository.name);

  constructor(
    @InjectModel(Module.name) ModuleModel: Model<Module>,
    @InjectConnection() connection: Connection
  ) {
    super(ModuleModel, connection);
  }
}
