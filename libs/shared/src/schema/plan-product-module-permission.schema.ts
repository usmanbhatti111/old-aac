import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, HydratedDocument } from 'mongoose';

export type PlanProductModulePermissionDocument =
  HydratedDocument<PlanProductModulePermission>;

@Schema()
export class PlanProductModulePermission extends Document {
  @Prop({
    type: [{ required: true, type: mongoose.Types.ObjectId, ref: 'Plan' }],
  })
  plan_id: string; // Reference to Plan _id

  @Prop({
    type: [{ required: true, type: mongoose.Types.ObjectId, ref: 'Product' }],
  })
  product_id: string; // Reference to Product _id

  @Prop({
    type: [{ required: true, type: mongoose.Types.ObjectId, ref: 'Module' }],
  })
  module_id: string; // Reference to Module _id

  @Prop({
    type: [
      {
        required: true,
        type: mongoose.Types.ObjectId,
        ref: 'PlanProductModule',
      },
    ],
  })
  plan_product_module_id: string; // Reference to PlanProductModule _id

  @Prop({
    type: [
      {
        required: true,
        type: mongoose.Types.ObjectId,
        ref: 'ModulePermission',
      },
    ],
  })
  module_permission_id: string; // Reference to ModulePermission _id

  // Add other fields as needed
}

export const PlanProductModulePermissionSchema = SchemaFactory.createForClass(
  PlanProductModulePermission
);
