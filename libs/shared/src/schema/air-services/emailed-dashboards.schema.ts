import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { AbstractSchema } from '../abstract-repo/abstract.schema';

export type EmailedDashboardsDocument = HydratedDocument<EmailedDashboards>;

@Schema({
  versionKey: false,
  timestamps: true,
})
export class EmailedDashboards extends AbstractSchema {
  @Prop({ type: String, required: true, default: 'NO' })
  isRecurring: string;

  @Prop({ type: String, required: true })
  email: string;

  @Prop({ type: String, required: true })
  subject: string;

  @Prop({ type: String, required: true })
  message: string;

  @Prop({ type: String, required: false })
  schedule?: string;

  @Prop({ type: String, required: false })
  time?: string;

  @Prop({ type: String, required: true })
  fileType: string;
}

export const EmailedDashboardsSchema =
  SchemaFactory.createForClass(EmailedDashboards);
