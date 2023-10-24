import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';
import { ISalesProduct } from '../../dto';
import { AbstractSchema } from '../abstract-repo/abstract.schema';
export type SalesProductDocument = HydratedDocument<SalesProduct>;

@Schema({
  versionKey: false,
  timestamps: true,
})
export class SalesProduct extends AbstractSchema implements ISalesProduct {

  @Prop({ type: String, required: false })
  sku?: string;

  @Prop({ type: Number, required: true })
  purchasePrice: number;

  @Prop({ type: String, required: false })
  category?: string;

  @Prop({ type: String, required: false })
  description?: string;

  @Prop({ type: Number, required: true })
  unitPrice: number;

  @Prop({ type: String, required: false })
  fileUrl?: string;

  @Prop({ type: Boolean, default: true })
  isActive?: boolean;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: Date, required: false })
  createdAt?: Date;

  @Prop({ type: Date, required: false })
  updatedAt?: Date;

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

export const SalesProductSchema = SchemaFactory.createForClass(SalesProduct);
