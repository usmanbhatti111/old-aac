import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { StatusEnum } from '../../constants';
import { AbstractSchema } from '../abstract-repo/abstract.schema';

export type AdminRoleDocument = HydratedDocument<AdminRole>;

@Schema({ versionKey: false, timestamps: true })
export class AdminRole extends AbstractSchema {
  @Prop()
  name: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'products' })
  product: string;

  @Prop()
  isDefault: string;

  @Prop()
  description: string;

  @Prop({ type: String, enum: StatusEnum, default: 'ACTIVE' })
  status: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'users' })
  createdBy?: string;

  @Prop({ type: Array })
  permissions: [];
}

export const AdminRoleSchema = SchemaFactory.createForClass(AdminRole);
