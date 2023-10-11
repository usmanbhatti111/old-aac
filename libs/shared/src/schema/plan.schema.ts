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
  defaultUsers: number;

  @Prop({ required: true })
  defaultStorage: number;

  @Prop({ required: true })
  planPrice: number;

  @Prop()
  additionalPerUserPrice?: number;

  @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: MODEL.PRODUCT }] })
  planProducts?: Product[];

  @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: MODEL.PRODUCT }] })
  planProductFeatures?: PlanProductFeature[];

  @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: MODEL.PRODUCT }] })
  planProductModulePermissions?: PlanProductModulePermission[];

  @Prop()
  additionalStoragePrice?: number;

  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: MODEL.PLAN_TYPE })
  planTypeId: string;

  @Prop({ required: true, type: SchemaTypes.ObjectId })
  createdBy?: string;

  @Prop({ required: false, type: SchemaTypes.ObjectId })
  updatedBy?: string;

  @Prop({ default: Date.now })
  createdAt?: Date;

  @Prop()
  updatedAt?: Date;

  @Prop({ default: true })
  isActive?: boolean;
}

export const PlanSchema = SchemaFactory.createForClass(Plan);
