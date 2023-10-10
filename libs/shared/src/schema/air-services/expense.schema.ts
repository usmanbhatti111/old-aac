import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { AbstractSchema } from './../abstract-repo/abstract.schema';

export type ExpenseDocument = HydratedDocument<Expense>;

@Schema({
  versionKey: false,
  timestamps: true,
})
export class Expense extends AbstractSchema {
  @Prop({ type: String, required: false })
  type: string;

  @Prop({ type: String, required: true })
  cost: string;

  @Prop({ type: String, required: true })
  date: string;

  @Prop({ type: String, required: true })
  assetId: string;
}

export const ExpenseSchema = SchemaFactory.createForClass(Expense);
