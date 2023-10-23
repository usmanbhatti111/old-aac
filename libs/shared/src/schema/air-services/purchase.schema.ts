import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, HydratedDocument } from 'mongoose';
import { AbstractSchema } from './../abstract-repo/abstract.schema';

export type PurchaseDocument = HydratedDocument<Purchase>;

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

  @Prop({ type: Number, required: true })
  taxRatio: number;

  @Prop({ type: Number, required: false })
  discount: number;

  @Prop({ type: Number, required: false })
  taxRate: number;

  @Prop({ type: Number, required: false })
  shipping: number;
}
const PurchaseDetailSchema = SchemaFactory.createForClass(PurchaseDetail);

@Schema({
  versionKey: false,
  timestamps: true,
})
export class Purchase extends AbstractSchema {
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
  @Prop({ type: Date })
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
  @Prop({ type: String, required: true })
  status: string;
}

export const PurchaseSchema = SchemaFactory.createForClass(Purchase);
