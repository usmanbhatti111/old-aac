import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';
import { AbstractSchema } from './../abstract-repo/abstract.schema';

export type AssetTypeDocument = HydratedDocument<AssetType>;

@Schema({
  versionKey: false,
  timestamps: true,
})
export class AssetType extends AbstractSchema {
  @Prop({ type: String, required: false })
  Name: string;

  @Prop({ type: String, required: false })
  Description: string;
}

export const AssetTypeSchema = SchemaFactory.createForClass(AssetType);
