import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import mongoose, { HydratedDocument } from 'mongoose';
export type UserODocument = HydratedDocument<UserO>;

import { AbstractSchema } from './abstract-repo/abstract.schema';
import { UserRole } from '../constants/enums';

@Schema({ timestamps: true, versionKey: false })
export class UserO extends AbstractSchema {
  @Prop({ type: String, default: UserRole.SUPER_ADMIN })
  role?: string;

  @Prop({ type: Boolean, default: false })
  isProductOwner?: boolean;

  @Prop({ type: String })
  firstName: string;

  @Prop({ type: String })
  lastName: string;

  @Prop({ type: String })
  address: string;

  @Prop({ type: String, unique: true })
  email: string;

  @Prop({ type: String })
  phoneNumber: string;

  @Prop({ type: String })
  postCode: string;

  @Prop({ type: String })
  flatOrUnit?: string;

  @Prop({ type: String })
  buildingName?: string;

  @Prop({ type: String })
  buildingNumber?: string;

  @Prop({ type: String })
  streetName?: string;

  @Prop({ type: String })
  townOrCity?: string;

  @Prop({ type: String })
  country?: string;

  @Prop({ type: String })
  jobTitle?: string;

  @Prop({ type: String })
  facebookUrl: string;

  @Prop({ type: String })
  linkedUrl: string;

  @Prop({ type: String })
  twitterUrl: string;

  @Prop({ type: String, default: 'active' })
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

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }])
  jobs?: mongoose.Schema.Types.ObjectId[];

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }])
  products?: mongoose.Schema.Types.ObjectId[];

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Company' }])
  company?: mongoose.Schema.Types.ObjectId[];
}

export const UserOSchema = SchemaFactory.createForClass(UserO);
