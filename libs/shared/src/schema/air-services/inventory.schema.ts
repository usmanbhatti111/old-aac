import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, HydratedDocument, Types } from 'mongoose';
import { AbstractSchema } from './../abstract-repo/abstract.schema';

export type InventoryDocument = HydratedDocument<Inventory>;

@Schema({
  versionKey: false,
  timestamps: true,
})
export class Inventory extends AbstractSchema {
  @Prop({ type: String, required: false })
  displayName: string;

  @Prop({
    type: [SchemaTypes.ObjectId],
    required: false,
  })
  deviceIds: [string];

  @Prop({
    type: [SchemaTypes.ObjectId],
    required: false,
  })
  contractIds: [string];

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
    type: [{ type: SchemaTypes.ObjectId }],
    required: false,
  })
  attachments: string[];

  @Prop()
  installationDate: Date;
}

export const InventorySchema = SchemaFactory.createForClass(Inventory);
