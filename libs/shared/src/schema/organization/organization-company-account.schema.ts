import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { AbstractSchema } from '../abstract-repo/abstract.schema';
import { IOrganizationCompanyAccount } from '../../dto/organization';
import { Organization } from './organization.schema';

export type OrganizationCompanyAccountDocument = HydratedDocument<OrganizationCompanyAccount>;

@Schema()
export class OrganizationCompanyAccount extends AbstractSchema implements IOrganizationCompanyAccount{
  
  @Prop()
  organization_id: string;

  @Prop()
  organization: Organization;

  @Prop()
  logo_url?: string;

  @Prop()
  account_name: string;

  @Prop()
  phone_no: string;

  @Prop()
  address: string;

  @Prop()
  post_code: string;

  @Prop()
  status: string;
}

export const OrganizationCompanyAccountSchema = SchemaFactory.createForClass(OrganizationCompanyAccount);
