import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { AbstractSchema } from './abstract-repo/abstract.schema';

export type LifeCycleStageDocument = HydratedDocument<LifeCycleStage>;

@Schema({ versionKey: false, timestamps: true })
export class LifeCycleStage extends AbstractSchema {
  @Prop({ required: true })
  name?: string;
}

export const LifeCycleStageSchema =
  SchemaFactory.createForClass(LifeCycleStage);
