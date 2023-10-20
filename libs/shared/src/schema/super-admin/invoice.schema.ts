import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';
import { BillingCycleEnum, InvoiceStatusEnum } from '../../constants/enums';
import { AbstractSchema } from '../abstract-repo/abstract.schema';

@Schema({
  versionKey: false,
  timestamps: true,
})
export class OrgPlanDetail {
  @Prop({
    type: [SchemaTypes.ObjectId],
    required: false,
  })
  productId: string[];

  @Prop({
    type: String,
    required: false,
  })
  productName: string;

  @Prop({ type: String, required: false })
  planType: string;

  @Prop({ type: Number, required: false })
  planPrice: Number;

  @Prop({ type: Number, required: false })
  defaultUsers;

  @Prop({ type: Number, required: false })
  defaultStorage;

  @Prop({ type: Number, required: false, default: 0 })
  unitUserCost: Number;

  @Prop({ type: Number, required: false, default: 0 })
  unitStorageCost: Number;

  @Prop({ type: Number, required: false, default: 0 })
  additionalUsers?: number;

  @Prop({ type: Number, required: false, default: 0 })
  additionalStorage?: number;

  @Prop({ type: Number, required: false, default: 0 })
  planDiscount: number;

  @Prop({ type: Number, required: false })
  subTotal: Number;
}

export const OrgPlanDetailSchema = SchemaFactory.createForClass(OrgPlanDetail);

export type InvoiceDocument = HydratedDocument<Invoice>;

@Schema({
  versionKey: false,
  timestamps: true,
})
export class Invoice extends AbstractSchema {
  @Prop({
    type: SchemaTypes.ObjectId,
    required: true,
    ref: 'organizationplans',
  })
  organizationPlanId: string;

  @Prop({
    type: SchemaTypes.ObjectId,
    required: true,
    ref: 'organizations',
  })
  organizationId: string;

  @Prop({
    type: SchemaTypes.ObjectId,
    required: true,
    ref: 'plans',
  })
  planId: string;

  @Prop({
    type: Object,
    required: false,
  })
  details: object;

  @Prop({ type: String, required: false })
  invoiceNo: string;

  @Prop({ type: Date, required: false })
  billingDate: Date;

  @Prop({ type: Date, required: false })
  dueDate: Date;

  @Prop({
    type: String,
    required: false,
    enum: BillingCycleEnum,
  })
  billingCycle: BillingCycleEnum;

  @Prop({ type: Number, required: true })
  subTotal: Number;

  @Prop({ type: Number, required: false, default: 0 })
  invoiceDiscount: number;

  @Prop({ type: Number, required: false, default: 0 })
  afterDiscountAmout: number;

  @Prop({ type: Number, required: false, default: 0 })
  vat: number;

  @Prop({ type: Number, required: true })
  total: Number;

  @Prop({
    type: SchemaTypes.ObjectId,
    required: false,
    ref: 'users',
  })
  createdBy: string;

  @Prop({
    type: SchemaTypes.ObjectId,
    required: false,
    ref: 'users',
  })
  updatedBy: string;

  @Prop({
    type: String,
    required: false,
    enum: InvoiceStatusEnum,
    default: InvoiceStatusEnum.PENDING,
  })
  status: InvoiceStatusEnum;

  @Prop({ type: Boolean, required: false, default: false })
  isDeleted: boolean;
}

export const InvoiceSchema = SchemaFactory.createForClass(Invoice);
