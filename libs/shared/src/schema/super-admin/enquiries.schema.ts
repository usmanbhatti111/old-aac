import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractSchema } from '../abstract-repo/abstract.schema';
import mongoose from 'mongoose';
import { MODEL } from '../../constants/models';
import { EEnquiriesStatus } from '../../constants/enums';

@Schema({ versionKey: false, timestamps: true })
export class Enquiries extends AbstractSchema {
  @Prop({ type: String, required: true })
  query: string;

  @Prop({
    type: String,
    enum: EEnquiriesStatus,
    default: EEnquiriesStatus.PENDING,
    required: false,
  })
  status?: string;

  @Prop({ type: String, required: false })
  comment?: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: MODEL.USER })
  createdBy?: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: MODEL.USER })
  updatedBy?: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: MODEL.USER })
  deletedBy?: string;

  @Prop({ type: Boolean, default: false })
  isDeleted?: boolean;
}

export const EnquiriesSchema = SchemaFactory.createForClass(Enquiries);
