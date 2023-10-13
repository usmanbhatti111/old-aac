import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractSchema } from '../abstract-repo/abstract.schema';
import {
  AssetsSoftwareStatusEnum,
  AssetsSoftwareTypeEnum,
} from '../../constants/index';
import mongoose, { HydratedDocument, SchemaTypes } from 'mongoose';

export type AssetsSoftwareDocument = HydratedDocument<AssetsSoftware>;
@Schema({
  versionKey: false,
  timestamps: true,
})
export class AssetsSoftware extends AbstractSchema {
  @Prop({ type: Object, required: false, default: {} })
  details: string;
  @Prop({ type: String, required: true })
  name: string;
  @Prop({ type: String, required: true, enum: AssetsSoftwareStatusEnum })
  status: string;
  @Prop({ type: String, required: true, enum: AssetsSoftwareTypeEnum })
  type: string;
  @Prop({ type: SchemaTypes.ObjectId, ref: 'Category', required: false })
  categoryId?: mongoose.Schema.Types.ObjectId;
}

export const AssetsSoftwareSchema =
  SchemaFactory.createForClass(AssetsSoftware);
