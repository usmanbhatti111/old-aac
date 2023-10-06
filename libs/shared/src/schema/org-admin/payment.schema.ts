import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { AbstractSchema } from '../abstract-repo/abstract.schema';

// export type PaymentDocument = HydratedDocument<Payment>;

@Schema()
export class Payment extends AbstractSchema {
  @Prop({ type: String, required: true })
  cardNumber: string;

  @Prop({ type: Date, required: true })
  expirationDate: Date;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  orgId: string;

  @Prop({ type: Number, required: true })
  cvvCode?: number;

  @Prop({ type: Boolean, default: false })
  useCompanyAddress: boolean;

  @Prop({ type: Boolean, default: false })
  allowAdminToSee: boolean;

  @Prop({ type: [String], required: false })
  manageSubscriptionFor: string[];

  @Prop({ type: Boolean, default: false })
  isDeleted: boolean;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
