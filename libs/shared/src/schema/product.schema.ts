import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { AbstractSchema } from './abstract-repo/abstract.schema';

export type ProductDocument = HydratedDocument<Product>;

@Schema({ versionKey: false, timestamps: true })
export class Product extends AbstractSchema {
  @Prop({ type: String, required: true })
  name: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
