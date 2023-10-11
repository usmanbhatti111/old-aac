import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { MODEL } from '@shared/constants';
import { HydratedDocument, SchemaTypes } from 'mongoose';
import { AbstractSchema } from './abstract-repo/abstract.schema';
import { Product } from './product.schema';
import { PlanProductFeature } from './plan-product-feature.schema';
import { PlanProductModulePermission } from './plan-product-module-permission.schema';

export type PlanDocument = HydratedDocument<Plan>;

@Schema({ versionKey: false, timestamps: true })
export class Plan extends AbstractSchema {
  @Prop()
  description?: string;

  @Prop({ required: true })
  default_users: number;

  @Prop({ required: true })
  default_storage: number;

  @Prop({ required: true })
  plan_price: number;

  @Prop()
  additional_per_user_price?: number;

  @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: MODEL.PRODUCT }] })
  plan_products?: Product[];

  @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: MODEL.PRODUCT }] })
  plan_product_features?: PlanProductFeature[];

  @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: MODEL.PRODUCT }] })
  plan_product_module_permissions?: PlanProductModulePermission[];

  @Prop()
  additional_storage_price?: number;

  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: MODEL.PLAN_TYPE })
  plan_type_id: string;

  @Prop({ required: true, type: SchemaTypes.ObjectId })
  created_by?: string;

  @Prop({ required: false, type: SchemaTypes.ObjectId })
  updated_by?: string;

  @Prop({ default: Date.now })
  created_at?: Date;

  @Prop()
  updated_at?: Date;

  @Prop({ default: true })
  is_active?: boolean;
}

export const PlanSchema = SchemaFactory.createForClass(Plan);
