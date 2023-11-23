import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { SchemaTypes } from 'mongoose';
import { AbstractSchema } from '../../abstract-repo/abstract.schema';
import { EIsDeletedStatus, MODEL } from '@shared/constants';

@Schema({
  versionKey: false,
  timestamps: true,
})
export class Company extends AbstractSchema {
  @Prop({
    type: String,
    required: false,
  })
  domain?: string;

  @Prop({ type: String, required: false })
  name: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: MODEL.USER,
    required: false,
  })
  ownerId?: string;

  // add refrence
  @Prop({ type: String, required: false })
  industry?: string;

  // add enums
  @Prop({ type: String, required: false })
  type?: string;

  @Prop({ type: Number, required: false })
  noOfEmloyee?: number;

  @Prop({ type: Number, required: false })
  totalRevenue?: number;

  @Prop({ type: String, required: false })
  city?: string;

  @Prop({ type: String, required: false })
  phone?: string;

  @Prop({ type: String, required: false })
  postalCode?: string;

  @Prop({ type: String, required: false })
  address?: string;

  @Prop({ type: String, required: false })
  description?: string;

  @Prop({ type: String, required: false })
  linkedInUrl?: string;

  @Prop({ type: String, required: false })
  crn?: string;

  @Prop({ type: String, required: false })
  timeZone?: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: MODEL.USER,
  })
  contactPersonId?: string;

  @Prop({ type: Date, required: false })
  joiningDate?: Date;

  @Prop({ type: SchemaTypes.ObjectId, required: false })
  recordId?: string | mongoose.Types.ObjectId;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: MODEL.LIFECYCLE_STAGE,
    required: false,
  })
  lifeCyleId?: string;

  @Prop({ type: SchemaTypes.ObjectId, required: false })
  createdById?: string;

  @Prop({ type: SchemaTypes.ObjectId, required: false })
  updatedById?: string;

  @Prop({ type: SchemaTypes.ObjectId, required: false })
  deletedById?: string;

  @Prop({
    type: String,
    enum: EIsDeletedStatus,
    required: false,
    default: EIsDeletedStatus.ACTIVE,
  })
  isDeleted?: string;

  // update only if hard delete
  @Prop({ required: false })
  deletedAt?: Date;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: MODEL.COMPANY,
  })
  parentCompanyId?: string;
}

export const CompanySchema = SchemaFactory.createForClass(Company);
