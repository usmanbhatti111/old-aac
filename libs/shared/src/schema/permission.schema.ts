import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ModulePermission } from '@prisma/client';
import { Document, HydratedDocument } from 'mongoose';
import { AbstractSchema } from './abstract-repo/abstract.schema';

export type PermissionDocument = HydratedDocument<Permission>;

@Schema()
export class Permission extends AbstractSchema {
  // Define fields for Permission
  module_permission: ModulePermission[];
}

export const PermissionSchema = SchemaFactory.createForClass(Permission);
