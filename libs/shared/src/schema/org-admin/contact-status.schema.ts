import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { AbstractSchema } from '../abstract-repo/abstract.schema';
import { EStatusToggle } from '../../constants';

@Schema({ versionKey: false, timestamps: true })
export class ContactStatus extends AbstractSchema {
  @Prop({ type: String, required: true, unique: true })
  name: string;

  @Prop({ type: String })
  description: string;

  @Prop({ type: String, enum: EStatusToggle, default: EStatusToggle.INACTIVE })
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

export const ContactStatusSchema = SchemaFactory.createForClass(ContactStatus);
