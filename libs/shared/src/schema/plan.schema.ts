import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { MODEL } from '@shared/constants';
import { HydratedDocument, SchemaTypes } from 'mongoose';
import { AbstractSchema } from './abstract-repo/abstract.schema';
import { PlanProductFeature } from './plan-product-feature.schema';
import { PlanProductPermission } from './plan-product-module-permission.schema';
import { Products } from './super-admin';

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
  planProducts?: Products[];

  @Prop({
    type: [{ type: SchemaTypes.ObjectId, ref: MODEL.PLAN_PRODUCT_FEATURE }],
  })
  planProductFeatures?: PlanProductFeature[];

  @Prop({
    type: [{ type: SchemaTypes.ObjectId, ref: MODEL.PLAN_PRODUCT_PERMISSION }],
  })
  planProductPermissions?: PlanProductPermission[];

  @Prop()
  additionalStoragePrice?: number;

  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: MODEL.PLAN_TYPE })
  planTypeId: string;

  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: MODEL.USER })
  createdBy?: string;

  @Prop({ required: false, type: SchemaTypes.ObjectId, ref: MODEL.USER })
  updatedBy?: string;

  @Prop({ default: Date.now })
  createdAt?: Date;

  @Prop({ required: false })
  updatedAt?: Date;

  @Prop({ required: false })
  deletedAt?: Date;

  @Prop({ required: false, type: SchemaTypes.ObjectId })
  deletedBy?: string;

  @Prop({ default: false })
  isDeleted?: boolean;

  @Prop({ default: true })
  isActive?: boolean;
}

export const PlanSchema = SchemaFactory.createForClass(Plan);
