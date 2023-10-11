import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { MODEL } from '@shared/constants';
import mongoose, {
  Document,
  HydratedDocument,
  ObjectId,
  SchemaTypes,
} from 'mongoose';
import { AbstractSchema } from './abstract-repo/abstract.schema';

export type ProductFeatureDocument = HydratedDocument<PlanProductFeature>;

@Schema()
export class PlanProductFeature extends AbstractSchema {
  @Prop({
    type: [{ required: true, type: SchemaTypes.ObjectId, ref: MODEL.PRODUCT }],
  })
  productId: string; // Reference to Product _id

  @Prop({
    type: [{ required: true, type: SchemaTypes.ObjectId, ref: MODEL.FEATURE }],
  })
  featureId: string; // Reference to Feature _id

  @Prop({ type: [{ required: false, type: String }] })
  dealsAssociationsDetail: string;

  // Add other fields as needed
}

export const PlanProductFeatureSchema =
  SchemaFactory.createForClass(PlanProductFeature);
