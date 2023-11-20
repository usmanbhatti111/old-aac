import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';
import { AbstractSchema } from '../abstract-repo/abstract.schema';
import { TicketDocument } from './ticket.schema';
import { ETaskNotifyStatus, ETicketsTaskStatus } from '../../constants/enums';

export type TaskDocument = HydratedDocument<Task>;

@Schema({ versionKey: false, timestamps: true })
export class Task extends AbstractSchema {
  @Prop({ type: SchemaTypes.ObjectId, ref: 'Ticket' })
  ticketId: TicketDocument;

  @Prop({ type: String, required: false })
  title: string;

  @Prop({
    type: String,
    required: false,
  })
  description: string;

  @Prop({
    type: SchemaTypes.ObjectId,
    required: false,
  })
  departmentId: string;

  @Prop({
    type: SchemaTypes.ObjectId,
    required: false,
  })
  createdBy: string;

  @Prop({ type: SchemaTypes.ObjectId, required: false })
  assignTo: string;

  @Prop({
    type: String,
    required: false,
    enum: ETicketsTaskStatus,
    default: ETicketsTaskStatus.TODO,
  })
  status: string;

  @Prop({
    type: String,
    required: false,
    enum: ETaskNotifyStatus,
  })
  notifyBefore: string;

  @Prop()
  startDate: Date;

  @Prop({ type: String, required: false })
  startDateTime: string;

  @Prop()
  endDate: Date;

  @Prop({ type: String, required: false })
  endDateTime: string;

  @Prop({ type: String, required: false })
  plannedEffort: String;

  @Prop({ type: String, required: false })
  comments: String;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
