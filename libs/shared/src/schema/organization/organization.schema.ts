import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';
import { AbstractSchema } from '../abstract-repo/abstract.schema';
import { IOrganization } from '@shared/dto';
export type OrganizationDocument = HydratedDocument<Organization>;

@Schema({
  versionKey: false,
  timestamps: true,
})
export class Organization extends AbstractSchema implements IOrganization{
  
  @Prop({ type: String, required: true })
  registrationNumber: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  email: string;

  @Prop({ type: String, required: true })
  phoneNo: string;

  @Prop({ type: String, required: true })
  address: string;

  @Prop({ type: String, required: true })
  postCode: string;

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
