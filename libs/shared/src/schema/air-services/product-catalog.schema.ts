import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractSchema } from '../abstract-repo/abstract.schema';

import { HydratedDocument, SchemaTypes } from 'mongoose';
import {
  EArticlesStatus,
  EModeOfProcurement,
  EProductCatalogStatus,
} from '../../constants/enums';
import { MODEL } from '../../constants/models';

export type ProductCatalogDocument = HydratedDocument<ProductCatalog>;
@Schema({
  versionKey: false,
  timestamps: true,
})
export class ProductCatalog extends AbstractSchema {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: SchemaTypes.ObjectId, required: true })
  assetType: string;

  @Prop({ type: String, required: true })
  manufacturer: string;

  @Prop({
    type: String,
    required: false,
    enum: EProductCatalogStatus,
  })
  status: string;

  @Prop({ type: String, required: true, enum: EModeOfProcurement })
  modeOfProcurement: string;

  @Prop({ type: String, required: false })
  description: string;

  @Prop({
    type: SchemaTypes.ObjectId,
    required: false,
    ref: MODEL.COMPANY,
  })
  companyId: string;

  @Prop({
    type: SchemaTypes.ObjectId,
    required: true,
    ref: MODEL.USER,
  })
  createdBy: string;
}

export const ProductCatalogSchema =
  SchemaFactory.createForClass(ProductCatalog);
