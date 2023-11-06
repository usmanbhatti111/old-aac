import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import mongoose, { HydratedDocument, SchemaTypes } from 'mongoose';
export type UserAccountsDocument = HydratedDocument<UserAccounts>;

import { AbstractSchema } from '../abstract-repo/abstract.schema';
import { UserRole, UserStatus } from '../../constants/enums';

@Schema({ timestamps: true, versionKey: false })
export class UserAccounts extends AbstractSchema {
  @Prop({ type: String, default: UserRole.SUPER_ADMIN })
  manageRole?: string;

  @Prop({ type: String, default: UserStatus.INACTIVE })
  status?: string;

  @Prop({ type: String, unique: true })
  createdById?: string;

  @Prop({ type: String, unique: true })
  updatedById?: string;

  @Prop({ type: String, unique: true })
  deletedById?: string;

  @Prop({ type: Date, default: Date.now })
  createdAt?: Date;

  @Prop({ type: Date })
  updatedAt?: Date;

  @Prop({ type: Date, default: Date.now })
  deletedAt?: Date;

  @Prop({ type: { type: mongoose.Schema.Types.ObjectId, ref: 'companies' } })
  company?: mongoose.Schema.Types.ObjectId;

  @Prop({
    type: SchemaTypes.ObjectId,
    required: false,
  })
  products?: mongoose.Schema.Types.ObjectId;
}

export const UserAccountsSchema = SchemaFactory.createForClass(UserAccounts);
