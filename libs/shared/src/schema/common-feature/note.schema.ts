import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { AbstractSchema } from '../abstract-repo/abstract.schema';
import { MODEL } from '../../constants/models';
import { MediaObject } from '../../dto/common';

@Schema({ versionKey: false, timestamps: true })
export class Note extends AbstractSchema {
  @Prop({ type: mongoose.Types.ObjectId, required: true })
  recordId: string;

  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String, required: false })
  description?: string;

  @Prop({ type: mongoose.SchemaTypes.Mixed, required: false })
  file?: MediaObject;

  @Prop({ type: mongoose.Types.ObjectId, ref: MODEL.USER })
  createdBy?: string;

  @Prop({ type: mongoose.Types.ObjectId, ref: MODEL.USER })
  updatedBy?: string;

  @Prop({ type: mongoose.Types.ObjectId, ref: MODEL.USER })
  deletedBy?: string;

  @Prop({ type: Boolean, default: false })
  isDeleted?: boolean;
}

export const NoteSchema = SchemaFactory.createForClass(Note);
