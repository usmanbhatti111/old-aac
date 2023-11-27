import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractSchema } from '../../abstract-repo/abstract.schema';
import { SchemaTypes } from 'mongoose';
import {
  ECallsSetReminder,
  ECallsStatus,
  ECallsType,
  OutcomeEnum,
} from '@shared/constants';

@Schema({ versionKey: false, timestamps: true })
export class ScheduleCalls extends AbstractSchema {
  @Prop({
    type: SchemaTypes.ObjectId,
    required: false,
    ref: 'organizations',
  })
  organizationId?: string;

  @Prop({
    type: String,
    required: true,
  })
  title: string;

  @Prop({
    type: String,
    required: false,
    enum: ECallsStatus,
    default: ECallsStatus.SCHEDULED,
  })
  status?: ECallsStatus;

  @Prop({
    type: SchemaTypes.Date,
    required: true,
  })
  callFromDate: Date;

  @Prop({
    type: String,
    required: false,
  })
  callFromTime?: string;

  @Prop({
    type: SchemaTypes.Date,
    required: false,
  })
  callToDate?: Date;

  @Prop({
    type: String,
    required: false,
  })
  callToTime?: string;

  @Prop({
    type: SchemaTypes.ObjectId,
    required: false,
    ref: 'deals',
  })
  dealId?: string;

  @Prop({
    type: String,
    required: false,
    enum: ECallsType,
    default: ECallsType.ONE_ON_ONE,
  })
  callType?: ECallsType;

  @Prop({
    type: String,
    required: false,
    enum: ECallsSetReminder,
  })
  setReminder?: ECallsSetReminder;

  @Prop({
    type: [SchemaTypes.ObjectId],
    required: false,
    ref: 'users',
  })
  attendees?: string[];

  @Prop({
    type: String,
    required: false,
    enum: OutcomeEnum,
  })
  outcome?: OutcomeEnum;

  @Prop({
    type: String,
    required: false,
  })
  callDetails?: string;

  @Prop({
    type: String,
    required: false,
  })
  callNotes?: string;

  @Prop({
    type: SchemaTypes.ObjectId,
    required: false,
    ref: 'users',
  })
  scheduledBy?: string;

  @Prop({
    type: Boolean,
    required: false,
    default: false,
  })
  isDeleted?: Boolean;

  @Prop({
    type: SchemaTypes.ObjectId,
    required: false,
    ref: 'users',
  })
  deletedBy?: string;
}
export const ScheduleCallsSchema = SchemaFactory.createForClass(ScheduleCalls);

// title: string;
// status: ECallsStatus;
// callFromDate: Date;
// callFromTime?: string;
// callToDate: Date;
// callToTime?: string;
// dealId?: string;
// callType?: ECallsType;
// setReminder?: ECallsSetReminder;
// attendees?: string[];
// outcome?: OutcomeEnum;
// callDetails?: string;
// callNotes?: string;
