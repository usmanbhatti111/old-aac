import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { PlanProductModulePermission } from '@prisma/client';
import mongoose, { Document, HydratedDocument } from 'mongoose';

export type ModulePermissionDocument = HydratedDocument<ModulePermission>;

@Schema()
export class ModulePermission extends Document {
  @Prop({
    type: [{ required: true, type: mongoose.Types.ObjectId, ref: 'Module' }],
  })
  module: string; // Reference to Module _id

  @Prop({
    type: [
      { required: true, type: mongoose.Types.ObjectId, ref: 'Permission' },
    ],
  })
  permission: string; // Reference to Permission _id

  plan_product_module_permission: PlanProductModulePermission[];
  // Add other fields as needed
}

export const ModulePermissionSchema =
  SchemaFactory.createForClass(ModulePermission);
