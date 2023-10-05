import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  ModulePermission,
  PlanProductModule,
  PlanProductModulePermission,
} from '@prisma/client';
import { Document, HydratedDocument } from 'mongoose';

export type ModuleDocument = HydratedDocument<Module>;

@Schema()
export class Module extends Document {
  // Define fields for Module
  plan_product_module: PlanProductModule[];
  plan_product_module_permission: PlanProductModulePermission[];
  module_permission: ModulePermission[];
}

export const ModuleSchema = SchemaFactory.createForClass(Module);
