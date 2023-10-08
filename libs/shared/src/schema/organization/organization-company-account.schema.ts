import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, SchemaTypes } from 'mongoose';
import { AbstractSchema } from '../abstract-repo/abstract.schema';
import { IOrganizationCompanyAccount } from '../../dto/organization';
import { Organization } from './organization.schema';

export type OrganizationCompanyAccountDocument = HydratedDocument<OrganizationCompanyAccount>;

@Schema()
export class OrganizationCompanyAccount extends AbstractSchema implements IOrganizationCompanyAccount{

  @Prop({
    type: SchemaTypes.ObjectId,
    required: true,
    ref: 'organization'
  })
  organizationId: string;

  @Prop({ type: String, required: false })
  logoUrl?: string;

  @Prop({ type: String, required: true })
  accountName: string;

  @Prop({ type: String, required: true })
  phoneNo: string;

  @Prop({ type: String, required: true })
  address: string;

  @Prop({ type: String, required: true })
  postCode: string;

  @Prop({ type: String, required: false, default:'Active' })
  status: string;

  @Prop({ type: [SchemaTypes.ObjectId], ref: 'products', default: [] }) 
  products: string[]; 
}

export const OrganizationCompanyAccountSchema = SchemaFactory.createForClass(OrganizationCompanyAccount);
