import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, SchemaTypes } from 'mongoose';
import { UserStatus } from '../../constants';
import { AbstractSchema } from '../abstract-repo/abstract.schema';
import { Organization, OrganizationCompanyAccount } from '../organization';
import { Products } from '../super-admin';
import { User } from './user.schema';

export type UserCompanyAccountDocument = HydratedDocument<UserCompanyAccount>;

@Schema({ versionKey: false, timestamps: true })
export class UserCompanyAccount extends AbstractSchema {
  @Prop({
    type: SchemaTypes.ObjectId,
    required: true,
    ref: User.name,
  })
  user: string;

  @Prop({
    type: SchemaTypes.ObjectId,
    required: true,
    ref: Products.name,
  })
  product: string;

  @Prop({
    type: SchemaTypes.ObjectId,
    required: true,
    ref: 'organizationcompanyaccounts',
  })
  company: string;

  @Prop({
    type: SchemaTypes.ObjectId,
    required: true,
    ref: Organization.name,
  })
  organization: string;

  @Prop({
    required: false,
    type: Array,
  })
  slugs?: [];

  @Prop({
    type: SchemaTypes.ObjectId,
    required: false,
  })
  role?: string;

  @Prop({
    enum: [UserStatus.ACTIVE, UserStatus.INACTIVE],
    default: UserStatus.ACTIVE,
    required: true,
  })
  status?: string; // ACTIVE, INACTIVE

  @Prop({ default: false, required: true })
  isActive: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'users', default: null })
  createdBy?: string;
}

export const UserCompanyAccountSchema =
  SchemaFactory.createForClass(UserCompanyAccount);
