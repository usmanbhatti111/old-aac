import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { AbstractSchema } from '../abstract-repo/abstract.schema';

export type ReportsWidgetDocument = HydratedDocument<ReportsWidget>;

@Schema({
  versionKey: false,
  timestamps: true,
})
export class ReportsWidget extends AbstractSchema {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: false })
  description?: String;

  @Prop({ type: JSON, required: false, default: {} })
  chartConfig: Object;
}

export const ReportsWidgetSchema = SchemaFactory.createForClass(ReportsWidget);
