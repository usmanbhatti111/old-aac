import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, SchemaTypes } from 'mongoose';
import { UserRole, UserStatus } from '../../constants';
import { MediaObject } from '../../dto';
import { AbstractSchema } from '../abstract-repo/abstract.schema';
import { Organization } from '../organization';
import { Products } from '../super-admin';

export type UserDocument = HydratedDocument<User>;

export class Address {
  @Prop()
  flatNumber: string; // alt: unit
  @Prop()
  buildingName: string;
  @Prop()
  buildingNumber: string;
  @Prop()
  streetName: string;
  @Prop()
  city: string; // alt: town
  @Prop()
  country: string;
  @Prop()
  composite: string;
}

@Schema({ versionKey: false, timestamps: true })
export class User extends AbstractSchema {
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop({ type: SchemaTypes.Mixed })
  avatar?: MediaObject;

  @Prop({ unique: true })
  email: string; // unique

  @Prop({ required: false })
  phoneNumber?: string;

  @Prop()
  mobileNumber?: string;

  @Prop()
  postCode?: string;

  @Prop({ type: Address })
  address?: object;

  @Prop()
  jobTitle?: string;

  @Prop()
  facebookUrl?: string;

  @Prop()
  linkedInUrl?: string;

  @Prop()
  twitterUrl?: string;

  @Prop({ type: Boolean })
  isOwner?: boolean; // for first user

  @Prop({ required: false })
  cognitoId?: string;

  @Prop({ enum: UserRole, required: true })
  role: string;

  @Prop()
  igVerficationId?: string;

  @Prop()
  igVerifiedPhoneNumber?: string;

  @Prop()
  igStatus?: string;

  @Prop()
  liveStatus?: string; // AVAILABLE, BUSY, MEETING, AWAY, BREAK

  @Prop({ enum: UserStatus, default: UserStatus.INACTIVE, required: true })
  status?: string; // ACTIVE, INACTIVE, BLOCKED, DELETED

  @Prop({
    type: [SchemaTypes.ObjectId],
    required: false,
    ref: Products.name,
  })
  products?: [];

  @Prop({
    type: SchemaTypes.ObjectId,
    required: false,
    ref: Organization.name,
  })
  organization?: string;

  @Prop({
    type: SchemaTypes.ObjectId,
    required: false,
  })
  company?: string;

  @Prop()
  drn?: string; // Delegate Reference Number

  @Prop({ type: Date })
  lastSeen?: string;

  @Prop()
  timezone?: string;

  @Prop()
  numberOfEmployees?: string;

  @Prop({ type: Boolean })
  enableEmployeeVerification?: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'users', default: null })
  createdBy?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
