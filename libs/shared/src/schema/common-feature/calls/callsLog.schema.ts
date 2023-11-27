import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractSchema } from '../../abstract-repo/abstract.schema';
import { SchemaTypes } from 'mongoose';

@Schema({ versionKey: false, timestamps: true })
export class CallsLog extends AbstractSchema {
  @Prop({
    type: SchemaTypes.ObjectId,
    required: true,
    ref: 'users',
  })
  callFrom: string;

  @Prop({
    type: SchemaTypes.ObjectId,
    required: true,
    ref: 'users',
  })
  callTo: string;

  @Prop({
    type: SchemaTypes.Date,
    required: false,
  })
  callStartTime: Date;

  @Prop({
    type: SchemaTypes.Date,
    required: false,
  })
  callEndTime: Date;
}
export const CallsLogSchema = SchemaFactory.createForClass(CallsLog);
