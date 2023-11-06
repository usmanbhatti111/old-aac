import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { AbstractSchema } from './abstract-repo/abstract.schema';
import mongoose from 'mongoose';
import { MODEL } from '../constants/models';

@Schema({ versionKey: false, timestamps: true })
export class Faq extends AbstractSchema {
  @Prop({ type: String, required: true })
  faqQuestion: string;

  @Prop({ type: String, required: true })
  faqCategory: string;

  @Prop({ type: String, required: true })
  faqAnswer: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: MODEL.USER })
  createdBy?: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: MODEL.USER })
  updatedBy?: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: MODEL.USER })
  deletedBy?: string;

  @Prop({ type: Boolean, default: false })
  isDeleted?: boolean;
}

export const FaqSchema = SchemaFactory.createForClass(Faq);
