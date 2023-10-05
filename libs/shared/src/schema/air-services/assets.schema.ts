import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, HydratedDocument } from 'mongoose';

export type AssetDocument = HydratedDocument<Asset>;

@Schema()
export class Asset {
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
  usedBy: string;

  @Prop({
    type: SchemaTypes.ObjectId,
    required: false,
  })
  attachmentId: string;
}

export const AssetSchema = SchemaFactory.createForClass(Asset);
