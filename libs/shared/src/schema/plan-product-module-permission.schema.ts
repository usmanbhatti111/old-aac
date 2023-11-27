import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { MODEL } from '@shared/constants';
import mongoose, { HydratedDocument, SchemaTypes } from 'mongoose';
import { AbstractSchema } from './abstract-repo/abstract.schema';
import { Permission } from './permission.schema';

export type PlanProductPermissionDocument =
  HydratedDocument<PlanProductPermission>;

@Schema()
export class PlanProductPermission extends AbstractSchema {
  @Prop({ required: true, type: mongoose.Types.ObjectId, ref: MODEL.PRODUCT })
  productId: string | mongoose.Types.ObjectId; // Reference to Product _id

  @Prop({
    type: [{ required: true, type: String, ref: MODEL.PERMISSION }],
  })
  permissionSlugs?: string[];

  // Add other fields as needed
}

export const PlanProductPermissionSchema = SchemaFactory.createForClass(
  PlanProductPermission
);
