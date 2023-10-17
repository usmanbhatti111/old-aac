import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';
import { AbstractSchema } from '../abstract-repo/abstract.schema';
import { UserO } from '../user.schema';

export type TaskManagementDocument = HydratedDocument<TaskManagement>;

@Schema({ versionKey: false, timestamps: true })
export class TaskManagement extends AbstractSchema {
  @Prop()
  name: string;

  @Prop()
  type: string;

  @Prop()
  priority: string;

  @Prop()
  status: string;

  @Prop()
  deal: string;

  @Prop()
  associate: string;

  @Prop({
    type: { type: SchemaTypes.ObjectId, required: false },
  })
  assignTo: string;

  @Prop()
  dueDate: Date;

  @Prop()
  time: string;

  @Prop()
  reminder: string;

  @Prop({ type: String, maxlength: 10485760 })
  note: string;
}

export const TaskManagementSchema =
  SchemaFactory.createForClass(TaskManagement);
