import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';
import { AbstractSchema } from '../abstract-repo/abstract.schema';
import { TicketDocument } from './ticket.schema';

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

  @Prop({ type: String, required: false })
  workSpace: string;

  @Prop({ type: String, required: false })
  assignTo: string;

  @Prop({ type: String, required: false })
  status: string;

  @Prop({ type: String, required: false })
  notifyBefore: string;

  @Prop()
  startDate: Date;

  @Prop()
  endDate: Date;

  @Prop({ type: String, required: false })
  plannedEffort: String;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
