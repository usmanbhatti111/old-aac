import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';
import { AbstractSchema } from '../../abstract-repo/abstract.schema';

export type ContactDocument = HydratedDocument<Contact>;

@Schema({ versionKey: false, timestamps: true })
export class Contact extends AbstractSchema {
  @Prop({ required: true })
  email?: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'attachments' })
  profilePictureId: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  address?: string;

  @Prop({ required: false })
  dateOfBirth?: Date;

  @Prop()
  phoneNumber?: string;

  @Prop()
  whatsAppNumber?: string;

  @Prop({ required: true, type: SchemaTypes.ObjectId })
  contactOwnerId?: string;

  @Prop({ required: true })
  jobTitle: string;

  @Prop({ required: false, type: SchemaTypes.ObjectId })
  createdBy?: string;

  @Prop({ required: false, type: SchemaTypes.ObjectId })
  updatedBy?: string;

  @Prop({ default: Date.now })
  createdAt?: Date;

  @Prop({ required: false, default: Date.now })
  updatedAt?: Date;

  @Prop({ required: false })
  deletedAt?: Date;

  @Prop({ required: false, type: SchemaTypes.ObjectId })
  deletedBy?: string;

  @Prop({ default: false })
  isDeleted?: boolean;

  @Prop({ default: true })
  lifeCycleStageId?: string;

  @Prop({ required: false, type: SchemaTypes.ObjectId })
  statusId?: string;

  @Prop()
  dataOfJoinig?: Date;
}

export const ContactSchema = SchemaFactory.createForClass(Contact);
