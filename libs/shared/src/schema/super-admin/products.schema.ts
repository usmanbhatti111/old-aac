import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, SchemaTypes } from 'mongoose';
import { AbstractSchema } from '../abstract-repo/abstract.schema';
import { EStatusToggle } from '../../constants/enums';
import { MODEL } from '../../constants/models';
import { MediaObject } from '../../dto/common';

export type ProductsDocument = HydratedDocument<Products>;

@Schema({ versionKey: false, timestamps: true })
export class Products extends AbstractSchema {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String })
  description?: string;

  @Prop({ type: SchemaTypes.Mixed })
  logo?: MediaObject;

  @Prop({ type: String, enum: EStatusToggle, default: EStatusToggle.INACTIVE })
  status?: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: MODEL.USER })
  createdBy?: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: MODEL.USER })
  updatedBy?: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: MODEL.USER })
  deletedBy?: string;

  @Prop({ type: Boolean, default: false })
  isDeleted?: boolean;
}

export const ProductsSchema = SchemaFactory.createForClass(Products);
