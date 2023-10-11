import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ModulePermission, PlanProductModulePermission } from '@prisma/client';
import { Document, HydratedDocument } from 'mongoose';
import { AbstractSchema } from './abstract-repo/abstract.schema';

export type ModuleDocument = HydratedDocument<Module>;

@Schema()
export class Module extends AbstractSchema {
  // Define fields for Module
  plan_product_module_permission: PlanProductModulePermission[];
  module_permission: ModulePermission[];
}

export const ModuleSchema = SchemaFactory.createForClass(Module);
