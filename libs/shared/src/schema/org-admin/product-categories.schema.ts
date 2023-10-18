import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { AbstractSchema } from '../abstract-repo/abstract.schema';
import { EStatusToggle } from '../../constants/enums';

export type ProductCategoriesDocument = HydratedDocument<ProductCategories>;

@Schema({ versionKey: false, timestamps: true })
export class ProductCategories extends AbstractSchema {
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

export const ProductCategoriesSchema =
  SchemaFactory.createForClass(ProductCategories);
