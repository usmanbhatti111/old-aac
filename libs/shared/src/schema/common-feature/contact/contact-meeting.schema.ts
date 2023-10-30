import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';
import { AbstractSchema } from '../../abstract-repo/abstract.schema';
import { MODEL, OutcomeEnum } from '../../../constants';
import { Contact } from './contact.schema';
import { User } from '../../user-account';

export type ContactMeetingDocument = HydratedDocument<ContactMeeting>;

@Schema({ versionKey: false, timestamps: true })
export class ContactMeeting extends AbstractSchema {
  @Prop({ required: true })
  title?: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'attachments' })
  attachmentId: string;

  @Prop({ required: true })
  note: string;

  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: MODEL.CONTACT })
  contactId?: string;

  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: MODEL.USER })
  contactOwnerId?: string;

  @Prop({
    type: [
      {
        type: SchemaTypes.ObjectId,
        ref: MODEL.CONTACT,
      },
      {
        type: SchemaTypes.ObjectId,
        ref: MODEL.USER,
      },
    ],
  })
  attendees?: (Contact | User)[];

  @Prop({
    type: String,
    required: false,
    default: OutcomeEnum.INTERESTED,
    enum: OutcomeEnum,
  })
  outcome: string;

  @Prop()
  startDate?: Date;

  @Prop()
  endDate?: Date;

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

export const ContactMeetingSchema =
  SchemaFactory.createForClass(ContactMeeting);
