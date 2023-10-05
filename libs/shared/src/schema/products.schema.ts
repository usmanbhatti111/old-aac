import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { PlanProduct } from './plan-product.schema';
import { PlanProductFeature } from './plan-product-feature.schema';
import { PlanProductModule } from './plan-product-module.schema';
import { PlanProductModulePermission } from './plan-product-module-permission.schema';

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
  modifiedBy: boolean;

  @Prop({ type: Boolean, default: false })
  isDeleted: boolean;

  plan_product: PlanProduct[];
  plan_product_feature: PlanProductFeature[];
  plan_product_module: PlanProductModule[];
  plan_product_module_permission: PlanProductModulePermission[];
}

export const ProductsSchema = SchemaFactory.createForClass(Products);
