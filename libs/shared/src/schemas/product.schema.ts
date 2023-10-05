import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';
import { PlanProduct } from './plan-product.schema';
import { PlanProductFeature } from './plan-product-feature.schema';
import { PlanProductModule } from './plan-product-module.schema';
import { PlanProductModulePermission } from './plan-product-module-permission.schema';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product extends Document {
  // Define fields for Product
  plan_product: PlanProduct[];
  plan_product_feature: PlanProductFeature[];
  plan_product_module: PlanProductModule[];
  plan_product_module_permission: PlanProductModulePermission[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
