import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { AbstractSchema } from '../abstract-repo/abstract.schema';

export type ProductsDocument = HydratedDocument<Products>;

@Schema({ versionKey: false, timestamps: true })
export class Products extends AbstractSchema {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String })
  description: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'attachments' })
  logo: string;

  @Prop({ type: Boolean, default: false })
  isActive?: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'users' })
  createdBy?: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'users' })
  updatedBy?: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'users' })
  deletedBy?: string;

  @Prop({ type: Boolean, default: false })
  isDeleted?: boolean;
}

export const ProductsSchema = SchemaFactory.createForClass(Products);
