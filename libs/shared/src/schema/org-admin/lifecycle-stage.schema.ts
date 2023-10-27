import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { AbstractSchema } from '../abstract-repo/abstract.schema';

@Schema({ versionKey: false, timestamps: true })
export class LifecycleStages extends AbstractSchema {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String })
  description?: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'users' })
  createdBy?: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'users' })
  updatedBy?: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'users' })
  deletedBy?: string;

  @Prop({ type: Boolean, default: false })
  isDeleted?: boolean;

  @Prop({ required: false })
  probability?: number;
}

export const LifecycleStagesSchema =
  SchemaFactory.createForClass(LifecycleStages);
