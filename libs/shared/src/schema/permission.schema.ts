import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { HydratedDocument } from 'mongoose';
import { AbstractSchema } from './abstract-repo/abstract.schema';
import { PermissionStatus } from '../constants/enums';

export type PermissionDocument = HydratedDocument<Permission>;

@Schema()
export class Permission extends AbstractSchema {
  @Prop({
    type: String,
    default: PermissionStatus.ACTIVE,
    enum: PermissionStatus,
  })
  status?: string;

  @Prop({ type: String, required: true })
  product: string;

  @Prop({ type: String, required: true })
  slug: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  module: string;

  @Prop({ type: String })
  subModule?: string;

  @Prop({ default: Date.now })
  createdAt?: Date;

  @Prop({ required: false, default: Date.now })
  updatedAt?: Date;
}
export const PermissionSchema = SchemaFactory.createForClass(Permission);
