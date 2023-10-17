import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';
import { AbstractSchema } from './abstract-repo/abstract.schema';
import { PlanProductFeature } from './plan-product-feature.schema';
import { PlanProductModulePermission } from './plan-product-module-permission.schema';
import { PlanType } from './plan-type.schema';
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

  @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: 'products' }] })
  planProducts?: Products[];

  @Prop({
    type: [{ type: SchemaTypes.ObjectId, ref: PlanProductFeature.name }],
  })
  planProductFeatures?: PlanProductFeature[];

  @Prop({
    type: [
      { type: SchemaTypes.ObjectId, ref: PlanProductModulePermission.name },
    ],
  })
  planProductModulePermissions?: PlanProductModulePermission[];

  @Prop()
  additionalStoragePrice?: number;

  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: PlanType.name })
  planTypeId: string;

  @Prop({ required: true, type: SchemaTypes.ObjectId })
  createdBy?: string;

  @Prop({ required: false, type: SchemaTypes.ObjectId })
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
