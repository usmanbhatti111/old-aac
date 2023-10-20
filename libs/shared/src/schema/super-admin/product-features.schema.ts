import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

import { AbstractSchema } from '../abstract-repo/abstract.schema';
import { Products } from './products.schema';
import { EStatusToggle } from '../../constants/enums';

export type ProductFeaturesDocument = HydratedDocument<ProductFeatures>;

@Schema({ versionKey: false, timestamps: true })
export class ProductFeatures extends AbstractSchema {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Products.name })
  productId: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String })
  description: string;

  @Prop({ type: String, enum: EStatusToggle, default: EStatusToggle.INACTIVE })
  status?: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'users' })
  createdBy?: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'users' })
  updatedBy?: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'users' })
  deletedBy?: string;

  @Prop({ type: Boolean, default: false })
  isDeleted?: boolean;
}

export const ProductFeaturesSchema =
  SchemaFactory.createForClass(ProductFeatures);
