import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, HydratedDocument } from 'mongoose';
import { PlanProductModulePermission } from './plan-product-module-permission.schema';

export type PlanProductModuleDocument = HydratedDocument<PlanProductModule>;

@Schema()
export class PlanProductModule extends Document {
  @Prop({
    type: [{ required: true, type: mongoose.Types.ObjectId, ref: 'Plan' }],
  })
  plan: string; // Reference to Plan _id

  @Prop({
    type: [{ required: true, type: mongoose.Types.ObjectId, ref: 'Product' }],
  })
  product: string; // Reference to Product _id

  @Prop({
    type: [
      { required: true, type: mongoose.Types.ObjectId, ref: 'PlanProduct' },
    ],
  })
  plan_product: string; // Reference to PlanProduct _id

  @Prop({
    type: [{ required: true, type: mongoose.Types.ObjectId, ref: 'Module' }],
  })
  module: string; // Reference to Module _id

  plan_products_module_permission: PlanProductModulePermission[];
  // Add other fields as needed
}

export const PlanProductModuleSchema =
  SchemaFactory.createForClass(PlanProductModule);
