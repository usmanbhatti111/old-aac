import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, HydratedDocument } from 'mongoose';
import {
  TicketStatusEnum,
  TicketPirorityEnum,
  TicketTypeEnum,
  TicketInternalTypeEnum,
} from '../../constants/index';

export type TicketDocument = HydratedDocument<Ticket>;

@Schema()
export class Ticket {
  @Prop({ type: Object, required: false, default: {} })
  details: string;

  @Prop({
    type: String,
    required: false,
    default: TicketStatusEnum.CLOSED,
    enum: TicketStatusEnum,
  })
  status: string;

  @Prop({ type: String, required: true })
  subject: string;

  @Prop({
    type: String,
    required: false,
    default: TicketPirorityEnum.HIGH,
    enum: TicketPirorityEnum,
  })
  pirority: string;

  @Prop({
    type: String,
    required: false,
    default: TicketTypeEnum.EXTERNAL,
    enum: TicketTypeEnum,
  })
  type: string;

  @Prop({
    type: String,
    required: false,
    default: TicketInternalTypeEnum.INTERNAL,
    enum: TicketInternalTypeEnum,
  })
  internalType: string;

  @Prop({
    type: SchemaTypes.ObjectId,
    required: false,
  })
  caId: string;

  @Prop({
    type: SchemaTypes.ObjectId,
    required: false,
  })
  orgAdminId: string;

  @Prop({
    type: SchemaTypes.ObjectId,
    required: false,
  })
  catId: string;

  @Prop()
  createdAt?: Date;

  @Prop()
  updatedAt?: Date;
}

export const TicketSchema = SchemaFactory.createForClass(Ticket);
