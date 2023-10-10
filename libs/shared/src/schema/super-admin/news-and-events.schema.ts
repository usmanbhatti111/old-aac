import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { AbstractSchema } from './../abstract-repo/abstract.schema';

export type NewsAndEventDocument = HydratedDocument<NewsAndEvent>;

@Schema({ versionKey: false, timestamps: true })
export class NewsAndEvent extends AbstractSchema {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: String, required: true })
  type: string;

  @Prop({ type: String, default: 'inactive' })
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

export const NewsAndEventSchema = SchemaFactory.createForClass(NewsAndEvent);
