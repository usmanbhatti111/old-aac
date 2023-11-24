import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';
import { AbstractSchema } from './../abstract-repo/abstract.schema';

export type AssetTypeDocument = HydratedDocument<AssetType>;

@Schema({
  versionKey: false,
  timestamps: true,
})
export class AssetType extends AbstractSchema {
  @Prop({ type: String, required: true })
  Name: string;

  @Prop({ type: String, required: false })
  Description: string;
  @Prop({
    type: SchemaTypes.ObjectId,
    required: false,
  })
  createdBy: string;
}

export const AssetTypeSchema = SchemaFactory.createForClass(AssetType);
