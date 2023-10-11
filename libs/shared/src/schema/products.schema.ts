import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type ProductsDocument = HydratedDocument<Products>;

@Schema({ versionKey: false, timestamps: true })
export class Products {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String })
  description: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'attachments' })
  logo: string;

  @Prop({ type: Boolean, default: false })
  isActive: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'users' })
  modifiedBy: string;

  @Prop({ type: Boolean, default: false })
  isDeleted: boolean;
}

export const ProductsSchema = SchemaFactory.createForClass(Products);
