import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, HydratedDocument } from 'mongoose';
import { AbstractSchema } from './../abstract-repo/abstract.schema';
import { EApprovalStatusStatus } from '../../constants/index';
export type PurchaseDocument = HydratedDocument<Purchase>;
export type PurchaseApprovalDocument = HydratedDocument<PurchaseApproval>;
@Schema({ timestamps: true })
export class PurchaseApproval extends AbstractSchema {
  @Prop({
    type: String,
    required: false,
    default: EApprovalStatusStatus.PENDING,
    enum: EApprovalStatusStatus,
  })
  approvalStatus?: string;

  @Prop({ type: SchemaTypes.ObjectId, required: true, ref: 'users' })
  approverId?: string;

  @Prop({ type: SchemaTypes.ObjectId, required: true, ref: 'users' })
  createdBy?: string;
  @Prop({ type: SchemaTypes.ObjectId, required: true, ref: 'purchases' })
  purchaseId?: string;
  @Prop({ type: String, required: false })
  reasons?: string;
}

export const PurchaseApprovalSchema =
  SchemaFactory.createForClass(PurchaseApproval);

@Schema()
@Schema()
export class PurchaseApproval {
  @Prop({
    type: String,
    required: false,
    default: EApprovalStatusStatus.PENDING,
    enum: EApprovalStatusStatus,
  })
  approvalStatus: string;

  @Prop({ type: SchemaTypes.ObjectId, required: false, ref: 'users' })
  requestedapprId: string;

  @Prop({ type: SchemaTypes.ObjectId, required: false, ref: 'users' })
  userId: string;

  @Prop({ type: Object, required: false })
  details: object;

  @Prop({ type: Object, required: false })
  reminderDetails: object;
}

const PurchaseApprovalSchema = SchemaFactory.createForClass(PurchaseApproval);

@Schema()
export class PurchaseDetail {
  @Prop({ type: String, required: true })
  itemName: string;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: Number, required: true })
  costPerItem: number;

  @Prop({ type: Number, required: true })
  quantity: number;

  @Prop({ type: Number, required: false })
  received: number;

  @Prop({ type: Number, required: false })
  pending: number;

  @Prop({ type: Number, required: false })
  taxRatio: number;

  @Prop({ type: Number, required: false })
  discount: number;

  @Prop({ type: Number, required: false })
  taxRate: number;

  @Prop({ type: Number, required: false })
  shipping: number;
}

export const PurchaseDetailSchema =
  SchemaFactory.createForClass(PurchaseDetail);

@Schema({
  versionKey: false,
  timestamps: true,
})
export class Purchase extends AbstractSchema {
  @Prop({
    type: SchemaTypes.ObjectId,
    required: false,
  })
  createdBy: string;

  @Prop({ required: true })
  orderName: string;
  @Prop({ required: true })
  orderNumber: string;
  @Prop({
    type: SchemaTypes.ObjectId,
    required: false,
  })
  vendorId: string;
  @Prop({ type: String, required: true })
  currency: string;

  @Prop()
  expectedDeliveryDate: Date;
  @Prop({
    type: SchemaTypes.ObjectId,
    required: false,
  })
  locationId: string;
  @Prop({
    type: SchemaTypes.ObjectId,
    required: false,
  })
  departmentId: string;
  @Prop({ type: String, required: false })
  termAndCondition: string;

  @Prop({ type: Number, required: false })
  subTotal: number;

  @Prop({ type: [PurchaseDetailSchema], required: false })
  purchaseDetails: PurchaseDetail[];
  @Prop({ type: [PurchaseApprovalSchema], required: false })
  PurchaseApprovals: PurchaseApproval[];
  @Prop({ type: String, required: true })
  status: string;
}

export const PurchaseSchema = SchemaFactory.createForClass(Purchase);
