import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractSchema } from '../abstract-repo/abstract.schema';
import { SchemaTypes } from 'mongoose';
import { ECardTypes } from '../../constants/enums';

@Schema()
export class Payment extends AbstractSchema {
  @Prop({
    type: SchemaTypes.ObjectId,
    required: true,
    ref: 'organizations',
  })
  organizationId: string;

  @Prop({ type: String, required: false })
  stripeReferenceId: string;

  @Prop({ type: String, required: true })
  cardNumber: string;

  @Prop({ type: Date, required: true })
  expirationDate: Date;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({
    type: String,
    required: false,
    enum: ECardTypes,
    default: ECardTypes.MASTER,
  })
  type: ECardTypes;

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
    type: SchemaTypes.ObjectId,
    required: false,
    ref: 'users',
  })
  deletedBy: string;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
