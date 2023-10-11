import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { PlanProductFeature } from '@prisma/client';
import { Document, HydratedDocument } from 'mongoose';
import { AbstractSchema } from './abstract-repo/abstract.schema';

export type FeatureDocument = HydratedDocument<Feature>;

@Schema()
export class Feature extends AbstractSchema {
  // Define fields for Feature
}

export const FeatureSchema = SchemaFactory.createForClass(Feature);
