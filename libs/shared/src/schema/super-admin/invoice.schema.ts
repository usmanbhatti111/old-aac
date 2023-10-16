import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';
import { OrganizationPlan } from './organization-plan.schema';
import { BillingCycleEnum, InvoiceStatusEnum } from '../../constants/enums';
import { AbstractSchema } from '../abstract-repo/abstract.schema';
import { Organization } from '../organization';

@Schema({
  versionKey: false,
  timestamps: true,
})
export class ProductDetail {
  @Prop({
    type: SchemaTypes.ObjectId,
    required: true,
    // ref: Product.name,
  })
  productId: string;

  @Prop({
    type: String,
    required: true,
  })
  productName: string;

  @Prop({ type: String, required: true })
  planType: string;

  @Prop({ type: Number, required: true })
  planPrice: Number;

  @Prop({ type: Number, required: true })
  defaultUsers;

  @Prop({ type: Number, required: true })
  defaultStorage;

  @Prop({ type: Number, required: true })
  unitUserCost: Number;

  @Prop({ type: Number, required: true })
  unitStorageCost: Number;

  @Prop({ type: Number, required: false, default: 0 })
  additionalUsers?: number;

  @Prop({ type: Number, required: false, default: 0 })
  additionalStorage?: number;

  @Prop({ type: Number, required: false, default: 0 })
  planDiscount: number;

  @Prop({ type: Number, required: false, default: 0 })
  invoiceDiscount: number;

  @Prop({ type: Number, required: true })
  subTotal: Number;
}

export const ProductDetailSchema = SchemaFactory.createForClass(ProductDetail);

export type InvoiceDocument = HydratedDocument<Invoice>;

@Schema({
  versionKey: false,
  timestamps: true,
})
export class Invoice extends AbstractSchema {
  @Prop({
    type: SchemaTypes.ObjectId,
    required: true,
    ref: Organization.name,
  })
  organizationId: string;

  @Prop({
    type: SchemaTypes.ObjectId,
    required: true,
    ref: OrganizationPlan.name,
  })
  organizationPlanId: string;

  @Prop({ type: String, required: false })
  invoiceNo: string;

  @Prop({ type: Date, required: true })
  billingDate: Date;

  @Prop({
    type: String,
    required: false,
    enum: BillingCycleEnum,
  })
  billingCycle: BillingCycleEnum;

  @Prop({
    type: SchemaTypes.ObjectId,
    required: true,
    // ref: Plan.name
  })
  planId: string;

  @Prop({
    type: [ProductDetailSchema],
    required: false,
  })
  productDetails: ProductDetail[];

  @Prop({ type: Number, required: true })
  total: Number;

  @Prop({ type: Number, required: false, default: 0 })
  planDiscount: number;

  @Prop({ type: Number, required: false, default: 0 })
  invoiceDiscount: number;

  @Prop({ type: Number, required: false, default: 0 })
  tax: number;

  @Prop({
    type: SchemaTypes.ObjectId,
    required: true,
    // ref: Admin.name
  })
  createdBy: string;

  @Prop({
    type: String,
    required: false,
    enum: InvoiceStatusEnum,
    default: InvoiceStatusEnum.PENDING,
  })
  status: InvoiceStatusEnum;
}

export const InvoiceSchema = SchemaFactory.createForClass(Invoice);
