import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';
import { IDealPipeline, StageDto } from '../../dto';
import { AbstractSchema } from '../abstract-repo/abstract.schema';
export type DealPipelineDocument = HydratedDocument<DealPipeline>;

@Schema({
  versionKey: false,
  timestamps: true,
})
export class DealPipeline extends AbstractSchema implements IDealPipeline {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: Boolean, default: false })
  isDefault?: boolean;

  @Prop({
    required: false,
    type: [SchemaTypes.ObjectId],
    ref: 'lifecyclestages',
  })
  stages?: string[];

  @Prop({ type: Date, required: false })
  deletedAt?: Date;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'users' })
  createdBy?: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'users' })
  updatedBy?: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'users' })
  deletedBy?: string;

  @Prop({ type: Boolean, default: false })
  isDeleted?: boolean;
}

export const DealPipelineSchema = SchemaFactory.createForClass(DealPipeline);
