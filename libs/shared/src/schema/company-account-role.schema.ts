import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { HydratedDocument, SchemaTypes } from 'mongoose';
import { AbstractSchema } from './abstract-repo/abstract.schema';
import { Organization, OrganizationCompanyAccount } from './organization';
import { CompanyAccountRoleStatusEnum } from '../constants/enums';
import { MODEL } from '../constants/models';

export type CompanyAccountRoleDocument = HydratedDocument<CompanyAccountRole>;

@Schema({ versionKey: false, timestamps: true })
export class CompanyAccountRole extends AbstractSchema {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop({
    type: SchemaTypes.ObjectId,
    required: true,
    ref: Organization.name,
  })
  organizationId: string;

  @Prop({
    type: SchemaTypes.ObjectId,
    required: true,
    ref: MODEL.PRODUCT,
  })
  productId: string;

  @Prop({
    type: SchemaTypes.ObjectId,
    required: true,
    ref: OrganizationCompanyAccount.name,
  })
  organizationCompanyAccountId: string;

  @Prop({ ref: 'permissions', default: [] })
  permissions: string[];

  @Prop({
    type: String,
    enum: CompanyAccountRoleStatusEnum,
    default: CompanyAccountRoleStatusEnum.ACTIVE,
    required: false,
  })
  status?: string;
}
export const CompanyAccountRoleSchema =
  SchemaFactory.createForClass(CompanyAccountRole);
