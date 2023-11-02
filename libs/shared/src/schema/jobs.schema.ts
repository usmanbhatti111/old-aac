import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { MODEL } from '../constants/models';
import { AbstractSchema } from './abstract-repo/abstract.schema';
import { EJobStatus } from '../constants/enums';

@Schema({ versionKey: false, timestamps: true })
export class Job extends AbstractSchema {
  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String, required: true })
  jobType: string;

  @Prop({ type: String, required: true })
  jobCategory: string;

  @Prop({ type: String, required: true })
  experience: string;

  @Prop({ type: Number })
  numberOfVacancy: number;

  @Prop({ type: Date })
  deadline: Date;

  @Prop({
    type: String,
    enum: EJobStatus,
    default: EJobStatus.OPEN,
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

export const JobSchema = SchemaFactory.createForClass(Job);

JobSchema.index({ title: 'text', description: 'text' });
