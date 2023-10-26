import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractSchema } from '../abstract-repo/abstract.schema';

import { HydratedDocument, SchemaTypes } from 'mongoose';

export type ArticlesDocument = HydratedDocument<Articles>;
@Schema({
  versionKey: false,
  timestamps: true,
})
export class Articles extends AbstractSchema {
  @Prop({ type: String, required: true })
  details: string;

  @Prop({ type: SchemaTypes.ObjectId, required: false })
  folder: string;

  @Prop({ type: String, required: false })
  tags: string;

  @Prop({ type: String, required: false })
  keywords: string;

  @Prop({ type: Boolean, required: false, default: false })
  isApprovel: boolean;

  @Prop({ type: SchemaTypes.ObjectId, required: false })
  approver: string;

  @Prop({ type: Date, required: false })
  reviewDate: Date;
}

export const ArticlesSchema = SchemaFactory.createForClass(Articles);
