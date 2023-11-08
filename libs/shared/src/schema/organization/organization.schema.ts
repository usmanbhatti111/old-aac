import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';
import { IOrganization } from '../../dto';
import { AbstractSchema } from '../abstract-repo/abstract.schema';
export type OrganizationDocument = HydratedDocument<Organization>;

@Schema({
  versionKey: false,
  timestamps: true,
})
export class Organization extends AbstractSchema implements IOrganization {
  @Prop({ type: String, required: true })
  crn: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: false })
  email?: string;

  @Prop({ type: String, required: false })
  phoneNo?: string;

  @Prop({
    type: Object,
    required: false,
    address: {
      street: { type: String, required: false },
      city: { type: String, required: false },
      state: { type: String, required: false },
      postalCode: { type: String, required: false },
    },
  })
  address?: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
  };

  @Prop({ type: String, required: false })
  postCode?: string;

  @Prop({ type: String, required: false })
  logoUrl?: string;

  @Prop({ type: Date, required: false })
  createdAt?: Date;

  @Prop({ type: Date, required: false })
  updatedAt?: Date;

  @Prop({ type: Date, required: false })
  deletedAt?: Date;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'users' })
  createdBy?: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'users' })
  updatedBy?: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'users' })
  deletedBy?: string;

  @Prop({ type: Boolean, default: false })
  isDeleted?: boolean;
}

export const OrganizationSchema = SchemaFactory.createForClass(Organization);
