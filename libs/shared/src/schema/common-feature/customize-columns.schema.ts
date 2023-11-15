import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { SchemaTypes } from 'mongoose';
import { ECustomizeColumnType, MODEL } from '../../constants';
import { AbstractSchema } from '../abstract-repo/abstract.schema';

class ColumnsObject {
  @Prop({ type: String, required: true })
  slug: string;

  @Prop({ type: String, required: true })
  attributes: string;

  @Prop({ type: Boolean, default: false })
  active?: boolean;

  @Prop({ type: Number, required: true })
  order: number;
}

@Schema({ versionKey: false, timestamps: true })
export class CustomizeColumns extends AbstractSchema {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: MODEL.USER,
    required: false,
  })
  userId?: string;

  @Prop({ type: String, enum: ECustomizeColumnType, required: true })
  type: string;

  @Prop({ type: [SchemaTypes.Mixed], required: true })
  columns: ColumnsObject[];

  @Prop({ type: Boolean, default: false })
  isDeleted?: boolean;
}

export const CustomizeColumnsSchema =
  SchemaFactory.createForClass(CustomizeColumns);
