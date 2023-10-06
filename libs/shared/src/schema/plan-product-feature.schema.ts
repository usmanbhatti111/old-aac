import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { MODEL } from '@shared/constants';
import mongoose, { Document, HydratedDocument, ObjectId } from 'mongoose';
import { AbstractSchema } from './abstract-repo/abstract.schema';

export type PlanProductFeatureDocument = HydratedDocument<PlanProductFeature>;

@Schema()
export class PlanProductFeature extends AbstractSchema {
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
      { required: true, type: mongoose.Types.ObjectId, ref: MODEL.FEATURE },
    ],
  })
  feature_id: string | mongoose.Types.ObjectId; // Reference to Feature _id

  @Prop({ type: [{ required: false, type: String }] })
  deals_associations_detail: string;

  // Add other fields as needed
}

export const PlanProductFeatureSchema =
  SchemaFactory.createForClass(PlanProductFeature);
