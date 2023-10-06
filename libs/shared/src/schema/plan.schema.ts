import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { PlanProduct } from '@prisma/client';
import { MODEL } from '@shared/constants';
import mongoose, { Document, HydratedDocument } from 'mongoose';
import { AbstractSchema } from './abstract-repo/abstract.schema';

export type PlanDocument = HydratedDocument<Plan>;

@Schema({ versionKey: false, timestamps: true })
export class Plan extends AbstractSchema {
  @Prop()
  description?: string;

  @Prop({ required: true })
  default_users: number;

  @Prop({ required: true })
  default_storage: number;

  @Prop({ required: true })
  plan_price: number;

  @Prop()
  additional_per_user_price?: number;

  @Prop()
  additional_storage_price?: number;

  @Prop({ required: true, type: mongoose.Types.ObjectId, ref: MODEL.PLAN_TYPE })
  plan_type_id: string | mongoose.Types.ObjectId;

  @Prop({ default: Date.now })
  created_at?: Date;

  @Prop()
  updated_at?: Date;

  @Prop({ default: true })
  is_active?: boolean;
}

export const PlanSchema = SchemaFactory.createForClass(Plan);
