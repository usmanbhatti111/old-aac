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
  registration_number: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  email: string;

  @Prop({ type: String, required: true })
  phone_no: string;

  @Prop({ type: String, required: true })
  address: string;

  @Prop({ type: String, required: true })
  post_code: string;

  @Prop({ type: String, required: false })
  logo_url?: string;

  @Prop()
  created_at: Date;

  @Prop()
  updated_at: Date;

  @Prop()
  deleted_at: Date;
}

export const OrganizationSchema = SchemaFactory.createForClass(Organization);
