import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { HydratedDocument, SchemaTypes } from 'mongoose';
import { AbstractSchema } from './abstract-repo/abstract.schema';
import { Organization, OrganizationCompanyAccount } from './organization';

export type CompanyAccountRoleDocument = HydratedDocument<CompanyAccountRole>;

@Schema({ timestamps: true })
export class CompanyAccountRole extends AbstractSchema {
  @Prop()
  name: string;

  @Prop({
    type: SchemaTypes.ObjectId,
    required: true,
    ref: Organization.name,
  })
  organizationId: string;

  @Prop({
    type: SchemaTypes.ObjectId,
    required: true,
    ref: OrganizationCompanyAccount.name,
  })
  organizationCompanyAccountId: string;

  // @Prop({ type: [SchemaTypes.ObjectId], ref: 'permissions', default: [] })
  // permissions: string[];
  @Prop({ ref: 'permissions', default: [] })
  permissions: string[];
}
export const CompanyAccountRoleSchema =
  SchemaFactory.createForClass(CompanyAccountRole);
