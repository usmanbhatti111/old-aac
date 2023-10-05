import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, HydratedDocument } from 'mongoose';

export type PlanProductFeatureDocument = HydratedDocument<PlanProductFeature>;

@Schema()
export class PlanProductFeature extends Document {
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
    type: [{ required: true, type: mongoose.Types.ObjectId, ref: 'Feature' }],
  })
  feature: string; // Reference to Feature _id

  @Prop({ type: [{ required: false, type: String }] })
  deals_associations_detail: string;

  // Add other fields as needed
}

export const PlanProductFeatureSchema =
  SchemaFactory.createForClass(PlanProductFeature);
