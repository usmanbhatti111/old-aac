import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';
import { AbstractSchema } from '../../abstract-repo/abstract.schema';
import { MODEL } from '../../../constants';

export type ContactNoteDocument = HydratedDocument<ContactNote>;

@Schema({ versionKey: false, timestamps: true })
export class ContactNote extends AbstractSchema {
  @Prop({ required: true })
  title?: string;

  @Prop({ required: false, type: SchemaTypes.ObjectId, ref: 'attachments' })
  attachmentId?: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: MODEL.CONTACT })
  contactId?: string;

  @Prop({ required: false, type: SchemaTypes.ObjectId, ref: MODEL.USER })
  createdBy?: string;

  @Prop({ required: false, type: SchemaTypes.ObjectId, ref: MODEL.USER })
  updatedBy?: string;

  @Prop({ default: Date.now })
  createdAt?: Date;

  @Prop({ required: false, default: Date.now })
  updatedAt?: Date;

  @Prop({ required: false })
  deletedAt?: Date;

  @Prop({ required: false, type: SchemaTypes.ObjectId, ref: MODEL.USER })
  deletedBy?: string;

  @Prop({ default: false })
  isDeleted?: boolean;
}

export const ContactNoteSchema = SchemaFactory.createForClass(ContactNote);
