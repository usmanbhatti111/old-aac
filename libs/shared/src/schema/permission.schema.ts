import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ModulePermission } from '@prisma/client';
import { Document, HydratedDocument } from 'mongoose';

export type PermissionDocument = HydratedDocument<Permission>;

@Schema()
export class Permission extends Document {
  // Define fields for Permission
  module_permission: ModulePermission[];
}

export const PermissionSchema = SchemaFactory.createForClass(Permission);
