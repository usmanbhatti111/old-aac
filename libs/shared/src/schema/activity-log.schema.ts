import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class ActivityLog extends Document {
  @Prop({ type: Types.ObjectId, required: true })
  entityId: Types.ObjectId;

  @Prop({ required: true })
  activity: string;

  @Prop({ type: Types.ObjectId, required: true })
  performedBy: Types.ObjectId;
}

export const ActivityLogSchema = SchemaFactory.createForClass(ActivityLog);
