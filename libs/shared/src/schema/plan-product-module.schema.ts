import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, HydratedDocument } from 'mongoose';
import { PlanProductModulePermission } from './plan-product-module-permission.schema';
import { MODEL } from '@shared/constants';

export type PlanProductModuleDocument = HydratedDocument<PlanProductModule>;

@Schema()
export class PlanProductModule extends Document {
  @Prop({
    type: [{ required: true, type: mongoose.Types.ObjectId, ref: MODEL.PLAN }],
  })
  plan_id: string; // Reference to Plan _id

  @Prop({
    type: [
      { required: true, type: mongoose.Types.ObjectId, ref: MODEL.PRODUCT },
    ],
  })
  product_id: string; // Reference to Product _id

  @Prop({
    type: [
      {
        required: true,
        type: mongoose.Types.ObjectId,
        ref: MODEL.PLAN_PRODUCT,
      },
    ],
  })
  plan_product_id: string; // Reference to PlanProduct _id

  @Prop({
    type: [
      { required: true, type: mongoose.Types.ObjectId, ref: MODEL.MODULE },
    ],
  })
  module_id: string; // Reference to Module _id

  plan_products_module_permission: PlanProductModulePermission[];
  // Add other fields as needed
}

export const PlanProductModuleSchema =
  SchemaFactory.createForClass(PlanProductModule);
