import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';
import { AbstractSchema } from './../abstract-repo/abstract.schema';
import { MODEL } from '../../constants';
export type AssetTypeDocument = HydratedDocument<AssetType>;

@Schema({
  versionKey: false,
  timestamps: true,
})
export class AssetType extends AbstractSchema {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: false })
  description: string;
  @Prop({
    type: SchemaTypes.ObjectId,
    required: true,
    ref: MODEL.USER,
  })
  createdBy: string;
  @Prop({
    type: SchemaTypes.ObjectId,
    required: false,
  })
  companyId: string;
}

export const AssetTypeSchema = SchemaFactory.createForClass(AssetType);
