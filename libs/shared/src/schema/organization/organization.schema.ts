import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
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
}

export const OrganizationSchema = SchemaFactory.createForClass(Organization);
