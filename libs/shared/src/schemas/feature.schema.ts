import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { PlanProductFeature } from '@prisma/client';
import { Document, HydratedDocument } from 'mongoose';

export type FeatureDocument = HydratedDocument<Feature>;

@Schema()
export class Feature extends Document {
  // Define fields for Feature
  plan_product_feature: PlanProductFeature[];
}

export const FeatureSchema = SchemaFactory.createForClass(Feature);
