import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, HydratedDocument } from 'mongoose';
import {
  TicketStatusEnum,
  TicketPirorityEnum,
  TicketTypeEnum,
  TicketInternalTypeEnum,
} from '../../constants/index';
import { AbstractSchema } from '../abstract-repo/abstract.schema';

export type TicketDocument = HydratedDocument<Ticket>;

@Schema({
  versionKey: false,
  timestamps: true,
})
export class Ticket extends AbstractSchema {
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
}

export const TicketSchema = SchemaFactory.createForClass(Ticket);
