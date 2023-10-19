import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { AbstractSchema } from './abstract-repo/abstract.schema';

export type StatusDocument = HydratedDocument<Status>;

@Schema({ versionKey: false, timestamps: true })
export class Status extends AbstractSchema {
  @Prop({ required: true })
  name?: string;
}

export const StatusSchema = SchemaFactory.createForClass(Status);
