import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { AbstractSchema } from '../abstract-repo/abstract.schema';

export type AttachmentDocument = HydratedDocument<Attachment>;

@Schema({
  versionKey: false,
  timestamps: true,
})
export class Attachment extends AbstractSchema {
  @Prop({ type: mongoose.Types.ObjectId, required: false })
  organizationAdminId: string;

  @Prop({ type: mongoose.Types.ObjectId, required: false })
  companyAdminId: string;

  @Prop({ type: String, required: true })
  type: string;

  @Prop({ type: String, required: true })
  fileUrl: string;

  @Prop({ type: Object, required: true })
  s3UploadObject: object;

  @Prop({ type: String, required: true })
  serviceFeatureType: string;

  @Prop({ type: mongoose.Types.ObjectId, required: true })
  recordId: string;

  @Prop({ type: mongoose.Types.ObjectId, required: true })
  moduleId: string;
}

export const AttachmentSchema = SchemaFactory.createForClass(Attachment);
