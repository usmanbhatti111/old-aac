import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, HydratedDocument } from 'mongoose';
import { AbstractSchema } from './../abstract-repo/abstract.schema';

export type AssetDocument = HydratedDocument<Asset>;

@Schema({
  versionKey: false,
  timestamps: true,
})
export class Asset extends AbstractSchema {
  @Prop({ type: String, required: false })
  displayName: string;

  @Prop({
    type: SchemaTypes.ObjectId,
    required: false,
  })
  assetId: string;

  @Prop({ type: String, required: false })
  assetType: string;

  @Prop({ type: String, required: false })
  impact: string;

  @Prop({ type: String, required: false })
  description: string;

  assetlifeExpiry: Date;

  @Prop({
    type: SchemaTypes.ObjectId,
    required: false,
  })
  locationId: string;

  @Prop({
    type: SchemaTypes.ObjectId,
    required: false,
  })
  departmentId: string;

  assignedOn: string;

  @Prop({
    type: SchemaTypes.ObjectId,
    required: false,
  })
  usedBy: string;

  @Prop({
    type: SchemaTypes.ObjectId,
    required: false,
  })
  attachmentId: string;
}

export const AssetSchema = SchemaFactory.createForClass(Asset);
