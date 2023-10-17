import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';
import { AbstractSchema } from '../abstract-repo/abstract.schema';

export type RequestLogDocument = HydratedDocument<RequestLog>;

@Schema({
  versionKey: false,
  timestamps: true,
})
export class RequestLog extends AbstractSchema {
  @Prop({ type: String, required: true })
  description: string;

  @Prop({ required: false })
  createdAt?: Date;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'users' })
  user: string;
}

export const RequestLogSchema = SchemaFactory.createForClass(RequestLog);
