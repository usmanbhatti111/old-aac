import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';
import { AbstractSchema } from './abstract-repo/abstract.schema';

export type PermissionDocument = HydratedDocument<Permission>;

@Schema()
export class Permission extends AbstractSchema {
  // Define fields for Permission
}

export const PermissionSchema = SchemaFactory.createForClass(Permission);
