import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';
import { AbstractSchema } from '../../abstract-repo/abstract.schema';
import { MODEL, RecordStatusEnum } from '@shared/constants';
import { MediaObject } from '@shared/dto';

export type ContactDocument = HydratedDocument<Contact>;

@Schema({ versionKey: false, timestamps: true })
export class Contact extends AbstractSchema {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ type: SchemaTypes.Mixed })
  profilePicture?: MediaObject;

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

  @Prop({
    type: String,
    required: false,
    default: RecordStatusEnum.ACTIVE,
    enum: RecordStatusEnum,
  })
  recordStatus?: string;

  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: MODEL.USER })
  contactOwnerId?: string;

  @Prop({ required: true })
  jobTitle: string;

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

  @Prop({
    required: false,
    default: true,
    type: SchemaTypes.ObjectId,
    ref: 'lifecyclestages',
  })
  lifeCycleStageId?: string;

  @Prop({ required: false, type: SchemaTypes.ObjectId, ref: 'statuses' })
  statusId?: string;

  @Prop()
  dataOfJoinig?: Date;
}

export const ContactSchema = SchemaFactory.createForClass(Contact);
