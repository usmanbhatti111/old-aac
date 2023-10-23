import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';
import { AbstractSchema } from '../abstract-repo/abstract.schema';

export type TaskActivityDocument = HydratedDocument<TaskActivity>;

@Schema({ versionKey: false, timestamps: true })
export class TaskActivity extends AbstractSchema {
  @Prop()
  action: string;

  @Prop({
    type: SchemaTypes.ObjectId,
    ref: 'taskmanagements',
    required: false,
  })
  taskManagementId: string;

  @Prop({ type: SchemaTypes.ObjectId, required: false })
  createdById?: string;

  @Prop({ type: SchemaTypes.ObjectId, required: false })
  updatedById?: string;

  @Prop({ type: SchemaTypes.ObjectId, required: false })
  deletedById?: string;

  @Prop({ type: Date, default: Date.now })
  createdAt?: Date;

  @Prop({ type: Date })
  updatedAt?: Date;

  @Prop({ type: Date, default: Date.now })
  deletedAt?: Date;
}

export const TaskActivitySchema = SchemaFactory.createForClass(TaskActivity);
