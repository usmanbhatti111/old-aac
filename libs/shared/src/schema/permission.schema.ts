import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { HydratedDocument } from 'mongoose';
import { AbstractSchema } from './abstract-repo/abstract.schema';

export type PermissionDocument = HydratedDocument<Permission>;

@Schema()
export class Permission extends AbstractSchema {}
export const PermissionSchema = SchemaFactory.createForClass(Permission);
