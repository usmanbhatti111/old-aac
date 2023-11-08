import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { EDealViewSharedWith, EIsDeletedStatus } from '../../constants/enums';
import { MODEL } from '../../constants/models';
import { AbstractSchema } from '../abstract-repo/abstract.schema';

@Schema({ versionKey: false, timestamps: true })
export class DealViews extends AbstractSchema {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  apiUrl: string;

  @Prop({
    type: String,
    enum: EDealViewSharedWith,
    default: EDealViewSharedWith.PRIVATE,
    required: false,
  })
  sharedWith?: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: false })
  teamId?: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: MODEL.USER })
  createdBy?: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: MODEL.USER })
  updatedBy?: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: MODEL.USER })
  deletedBy?: string;

  @Prop({
    type: String,
    enum: EIsDeletedStatus,
    required: false,
    default: EIsDeletedStatus.ACTIVE,
  })
  isDeleted?: string;

  @Prop({ required: false })
  deletedAt?: Date;
}

export const DealViewsSchema = SchemaFactory.createForClass(DealViews);
