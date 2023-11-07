import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, SchemaTypes } from 'mongoose';
import { AbstractSchema } from '../abstract-repo/abstract.schema';
import { ReportsWidget } from './reports-widgets.schema';

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

  @Prop({
    type: [SchemaTypes.ObjectId],
    required: false,
    ref: ReportsWidget.name,
  })
  reportWidgetIds?: [mongoose.Schema.Types.ObjectId];
}

export const DashboardSchema = SchemaFactory.createForClass(Dashboard);
