import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';
import { Plan } from './plan.schema';
import { AbstractSchema } from './abstract-repo/abstract.schema';
import { MODEL } from '../constants/models';

export type PlanTypeDocument = HydratedDocument<PlanType>;

@Schema()
export class PlanType extends AbstractSchema {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: MODEL.PLAN }] })
  plan?: Plan[]; // Assuming it's an array of Plan _id references

  @Prop({ required: true, type: SchemaTypes.ObjectId })
  createdBy?: string;

  @Prop({ required: false, type: SchemaTypes.ObjectId })
  updatedBy?: string;

  @Prop({ default: Date.now })
  createdAt?: Date;

  @Prop({ required: false })
  updatedAt?: Date;

  @Prop({ required: false })
  deletedAt?: Date;

  @Prop({ required: false, type: SchemaTypes.ObjectId })
  deletedBy?: string;

  @Prop({ default: false })
  isDeleted?: boolean;
  // Add other fields as needed
}

export const PlanTypeSchema = SchemaFactory.createForClass(PlanType);
