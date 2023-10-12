import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';
import { AbstractSchema } from './abstract-repo/abstract.schema';

export type ModuleDocument = HydratedDocument<Module>;

@Schema()
export class Module extends AbstractSchema {
  // Define fields for Module
}

export const ModuleSchema = SchemaFactory.createForClass(Module);
