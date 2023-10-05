import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';
import { Plan } from './plan.schema';

export type PlanTypeDocument = HydratedDocument<PlanType>;

@Schema()
export class PlanType extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  plan: Plan[]; // Assuming it's an array of Plan _id references

  // Add other fields as needed
}

export const PlanTypeSchema = SchemaFactory.createForClass(PlanType);
