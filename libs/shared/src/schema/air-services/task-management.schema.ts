import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, SchemaTypes } from 'mongoose';
import { AbstractSchema } from '../abstract-repo/abstract.schema';
import { MODEL } from '../../constants/models';

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
  status?: string;

  @Prop({
    type: SchemaTypes.ObjectId,
    ref: MODEL.DEAL,
    required: false,
  })
  dealId?: string;

  @Prop()
  associate?: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: MODEL.USER, required: false })
  assignTo?: string;

  @Prop()
  dueDate?: Date;

  @Prop()
  time?: string;

  @Prop({ type: [SchemaTypes.ObjectId], required: false })
  recordIds?: string | mongoose.Types.ObjectId;

  @Prop()
  reminder?: string;

  @Prop({ type: String, maxlength: 10485760 })
  note?: string;

  @Prop({ type: SchemaTypes.ObjectId, required: false })
  createdById?: string;

  @Prop({ type: SchemaTypes.ObjectId, required: false })
  updatedById?: string;

  @Prop({ type: SchemaTypes.ObjectId, required: false })
  deletedById?: string;

  @Prop({ type: Date, default: Date.now })
  deletedAt?: Date;

  @Prop({ default: false })
  isDeleted?: boolean;
}

export const TaskManagementSchema =
  SchemaFactory.createForClass(TaskManagement);
