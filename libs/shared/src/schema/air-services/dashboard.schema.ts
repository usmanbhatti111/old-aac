import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { AbstractSchema } from '../abstract-repo/abstract.schema';

export type DashboardDocument = HydratedDocument<Dashboard>;

@Schema({
  versionKey: false,
  timestamps: true,
})
export class Dashboard extends AbstractSchema {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: Boolean, required: false, default: false })
  isDefault?: boolean;
}

export const DashboardSchema = SchemaFactory.createForClass(Dashboard);
