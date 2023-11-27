import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractSchema } from '../abstract-repo/abstract.schema';

import { HydratedDocument, SchemaTypes } from 'mongoose';
import { Organization } from '../organization';

export type VendorDocument = HydratedDocument<Vendor>;
@Schema({
  versionKey: false,
  timestamps: true,
})
export class Vendor extends AbstractSchema {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: SchemaTypes.String, required: false })
  contactName: string;

  @Prop({ type: String, required: false })
  phone: string;

  @Prop({ type: String, required: false })
  mobile: string;

  @Prop({ type: String, required: true, default: false })
  email: string;

  @Prop({ type: String, required: false })
  description: string;

  @Prop({ type: String, required: false })
  address: string;

  @Prop({ type: String, required: false })
  country: string;

  @Prop({ type: String, required: false })
  state: string;

  @Prop({ type: String, required: false })
  city: string;

  @Prop({ type: String, required: false })
  zipCode: string;

  @Prop({ type: String, required: false })
  companyId: string;
}

export const VendorsSchema = SchemaFactory.createForClass(Vendor);
