import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, HydratedDocument } from 'mongoose';
import { AbstractSchema } from './../abstract-repo/abstract.schema';

export type PurchaseDocument = HydratedDocument<Purchase>;

@Schema({
  versionKey: false,
  timestamps: true,
})
export class Purchase extends AbstractSchema {
  @Prop({ type: String, required: true })
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
}

export const PurchaseSchema = SchemaFactory.createForClass(Purchase);
