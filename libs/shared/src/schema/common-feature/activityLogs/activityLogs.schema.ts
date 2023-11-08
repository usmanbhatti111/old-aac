import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractSchema } from '../../abstract-repo/abstract.schema';
import { SchemaTypes } from 'mongoose';
import { EActivityType, EActivitylogModule } from '../../../constants';

@Schema({ versionKey: false, timestamps: true })
export class Activitylogs extends AbstractSchema {
  // example @Auth() => performedBy : user._id
  @Prop({
    type: SchemaTypes.ObjectId,
    required: true,
    ref: 'users',
  })
  performedBy: string;

  // example: CREATED, UPDATED, DELETED, UPLOADED, ASSOCIATED etc.
  @Prop({
    type: String,
    required: true,
    enum: EActivityType,
  })
  activityType: EActivityType;

  // example: deal._id, plan._id, ticket._id, attachment._id etc.
  @Prop({
    type: String,
    required: true,
  })
  moduleId: string;

  // example: DEALS, PLANS, TICKETS, CONTACTS, INVOICES etc.
  @Prop({
    type: String,
    required: true,
    enum: EActivitylogModule,
  })
  module: EActivitylogModule;

  // example: response?.name =>  deal.name, plan.name, ticket.name etc.
  @Prop({
    type: String,
    required: true,
  })
  moduleName: string;
}

export const ActivitylogsSchema = SchemaFactory.createForClass(Activitylogs);
