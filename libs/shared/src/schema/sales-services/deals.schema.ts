import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { SchemaTypes } from 'mongoose';

import { AbstractSchema } from '../abstract-repo/abstract.schema';
import {
  EBillingFrequency,
  EContactMode,
  EDealType,
  EIsDeletedStatus,
  ETaskPriority,
} from '../../constants/enums';
import { MODEL } from '../../constants/models';

@Schema({ versionKey: false, timestamps: true })
export class Deals extends AbstractSchema {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: MODEL.DEAL_PIPELINE,
    required: true,
  })
  dealPiplineId: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: MODEL.LIFECYCLE_STAGE,
    required: true,
  })
  dealStageId: string;

  @Prop({ type: Number, required: false })
  amount?: number;

  @Prop({ type: Date, required: false })
  closeDate?: Date;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: MODEL.USER,
    required: false,
  })
  dealOwnerId?: string;

  @Prop({
    type: String,
    enum: ETaskPriority,
    default: ETaskPriority.LOW,
    required: false,
  })
  priority?: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: 'lineItems',
  })
  addLineItemId?: string;

  @Prop({
    type: String,
    enum: EBillingFrequency,
    default: EBillingFrequency.MONTHLY,
    required: false,
  })
  billingFrequency?: string;

  @Prop({
    type: String,
    enum: EDealType,
    required: false,
  })
  type?: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: MODEL.USER,
  })
  contactedPersonId?: string;

  @Prop({
    type: String,
    enum: EContactMode,
    required: false,
  })
  contactMode?: string;

  @Prop({ type: Number, required: false, default: 0 })
  probability?: number;

  @Prop({
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'activities',
    default: [],
  })
  activitiesIds?: string[];

  @Prop({
    type: [mongoose.Schema.Types.ObjectId],
    ref: MODEL.CONTACT,
    default: [],
  })
  contactsIds?: string[];

  @Prop({
    type: [mongoose.Schema.Types.ObjectId],
    ref: MODEL.TICKET,
    default: [],
  })
  ticketsIds?: string[];

  @Prop({
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'companies',
    default: [],
  })
  companiesIds?: string[];

  @Prop({
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'products',
    default: [],
  })
  productsIds?: string[];

  @Prop({
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'quotes',
    default: [],
  })
  quotesIds?: string[];

  @Prop({
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'attachments',
    default: [],
  })
  attachmentsIds?: string[];

  @Prop({
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'playbooks',
    default: [],
  })
  playbooksIds?: string[];

  @Prop({
    type: [mongoose.Schema.Types.ObjectId],
    ref: MODEL.TASK,
    default: [],
  })
  tasksIds?: string[];

  // @Prop({
  //   type: [mongoose.Schema.Types.ObjectId],
  //   ref: 'notes',
  //   default: [],
  // })
  // notesIds?: string[];

  @Prop({
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'calls',
    default: [],
  })
  callsIds?: string[];

  @Prop({
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'emails',
    default: [],
  })
  emailsIds?: string[];

  @Prop({
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'meetings',
    default: [],
  })
  meetingsIds?: string[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: MODEL.USER })
  createdBy?: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: MODEL.USER })
  updatedBy?: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: MODEL.USER })
  deletedBy?: string;

  @Prop({
    type: String,
    enum: EIsDeletedStatus,
    required: false,
    default: EIsDeletedStatus.ACTIVE,
  })
  isDeleted?: string;

  @Prop({ type: SchemaTypes.ObjectId, required: false })
  recordIds?: string | mongoose.Types.ObjectId;

  @Prop({ required: false })
  deletedAt?: Date;
}

export const DealsSchema = SchemaFactory.createForClass(Deals);
