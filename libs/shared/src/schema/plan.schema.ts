import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { PlanProduct } from '@prisma/client';
import mongoose, { Document, HydratedDocument } from 'mongoose';

export type PlanDocument = HydratedDocument<Plan>;

@Schema()
export class Plan extends Document {
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

  @Prop({ required: true, type: mongoose.Types.ObjectId, ref: 'PlanType' })
  plan_type_id: string;

  @Prop()
  plan_product: PlanProduct[];

  @Prop({ default: Date.now })
  created_at: Date;

  @Prop()
  updated_at?: Date;

  @Prop({ default: true })
  is_active: boolean;
}

export const PlanSchema = SchemaFactory.createForClass(Plan);
