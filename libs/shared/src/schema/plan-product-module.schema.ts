import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, HydratedDocument } from 'mongoose';
import { PlanProductModulePermission } from './plan-product-module-permission.schema';
import { MODEL } from '@shared/constants';
import { AbstractSchema } from './abstract-repo/abstract.schema';

export type PlanProductModuleDocument = HydratedDocument<PlanProductModule>;

@Schema()
export class PlanProductModule extends AbstractSchema {
  @Prop({
    type: [{ required: true, type: mongoose.Types.ObjectId, ref: MODEL.PLAN }],
  })
  plan_id: string | mongoose.Types.ObjectId; // Reference to Plan _id

  @Prop({
    type: [
      { required: true, type: mongoose.Types.ObjectId, ref: MODEL.PRODUCT },
    ],
  })
  product_id: string | mongoose.Types.ObjectId; // Reference to Product _id

  @Prop({
    type: [
      {
        required: true,
        type: mongoose.Types.ObjectId,
        ref: MODEL.PLAN_PRODUCT,
      },
    ],
  })
  plan_product_id: mongoose.Types.ObjectId | string; // Reference to PlanProduct _id

  @Prop({
    type: [
      { required: true, type: mongoose.Types.ObjectId, ref: MODEL.MODULE },
    ],
  })
  module_id: string | mongoose.Types.ObjectId; // Reference to Module _id
  // Add other fields as needed
}

export const PlanProductModuleSchema =
  SchemaFactory.createForClass(PlanProductModule);
