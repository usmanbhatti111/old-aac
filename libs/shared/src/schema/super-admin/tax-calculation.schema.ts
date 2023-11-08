import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { EStatusToggle, ETaxApplyOn } from '../../constants/enums';
import { AbstractSchema } from '../abstract-repo/abstract.schema';
import { MODEL } from '../../constants/models';

@Schema({ versionKey: false, timestamps: true })
export class TaxCalculation extends AbstractSchema {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: Number, required: true })
  percentage: number;

  @Prop({ type: [String], enum: ETaxApplyOn, required: true })
  applyOn: string[];

  @Prop({
    type: String,
    enum: EStatusToggle,
    default: EStatusToggle.INACTIVE,
    required: false,
  })
  status?: string;

  @Prop({ type: String })
  description: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: MODEL.USER })
  createdBy?: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: MODEL.USER })
  updatedBy?: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: MODEL.USER })
  deletedBy?: string;

  @Prop({ type: Boolean, default: false })
  isDeleted?: boolean;
}

export const TaxCalculationSchema =
  SchemaFactory.createForClass(TaxCalculation);
