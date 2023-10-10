import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { MODEL } from '@shared/constants';
import { AbstractSchema } from './abstract-repo/abstract.schema';

export type PlanProductDocument = HydratedDocument<PlanProduct>;

@Schema()
export class PlanProduct extends AbstractSchema {
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
  // Add other fields as needed
}

export const PlanProductSchema = SchemaFactory.createForClass(PlanProduct);
