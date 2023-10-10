import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { MODEL } from '@shared/constants';
import mongoose, { Document, HydratedDocument } from 'mongoose';
import { AbstractSchema } from './abstract-repo/abstract.schema';

export type ProductModulePermissionDocument =
  HydratedDocument<PlanProductModulePermission>;

@Schema()
export class PlanProductModulePermission extends AbstractSchema {
  @Prop({
    type: [
      { required: true, type: mongoose.Types.ObjectId, ref: MODEL.PRODUCT },
    ],
  })
  product_id: string | mongoose.Types.ObjectId; // Reference to Product _id

  @Prop({
    type: [
      { required: true, type: mongoose.Types.ObjectId, ref: MODEL.MODULE },
    ],
  })
  module_id: string | mongoose.Types.ObjectId; // Reference to Module _id

  @Prop({
    type: [
      {
        required: true,
        type: mongoose.Types.ObjectId,
        ref: MODEL.MODULE_PERMISSION,
      },
    ],
  })
  module_permission_id: string | mongoose.Types.ObjectId; // Reference to ModulePermission _id

  // Add other fields as needed
}

export const ProductModulePermissionSchema = SchemaFactory.createForClass(
  PlanProductModulePermission
);
