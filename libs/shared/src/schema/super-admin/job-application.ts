import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractSchema } from '../abstract-repo/abstract.schema';
import mongoose, { SchemaTypes } from 'mongoose';
import { EApplicationStatus, MODEL } from '../../constants';
import { MediaObject } from '../../dto/common';

@Schema({ versionKey: false, timestamps: true })
export class JobApplications extends AbstractSchema {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: MODEL.JOBS,
    required: false,
  })
  jobId: string;

  @Prop({ type: SchemaTypes.Mixed })
  resume?: MediaObject;

  @Prop({ type: SchemaTypes.Mixed })
  coverLetter?: MediaObject;

  @Prop({
    type: String,
    enum: EApplicationStatus,
    default: EApplicationStatus.PENDING,
    required: false,
  })
  status?: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'users' })
  createdBy?: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'users' })
  updatedBy?: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'users' })
  deletedBy?: string;

  @Prop({ type: Boolean, default: false })
  isDeleted?: boolean;
}

export const JobApplicationsSchema =
  SchemaFactory.createForClass(JobApplications);
