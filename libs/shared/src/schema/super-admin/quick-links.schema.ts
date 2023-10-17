import { HydratedDocument, SchemaTypes } from 'mongoose';
import { AbstractSchema } from '../abstract-repo/abstract.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type QuickLinksDocument = HydratedDocument<QuickLinks>;

@Schema({ timestamps: true, versionKey: false })
export class QuickLinks extends AbstractSchema {
  @Prop({ type: SchemaTypes.ObjectId, ref: 'products' })
  productId: string;

  // Todo: Add sub module schema ref when it is defined
  @Prop({ type: SchemaTypes.ObjectId })
  moduleId: string;

  @Prop({ type: SchemaTypes.ObjectId, required: false })
  logoId?: string;

  @Prop({ type: String })
  url: string;

  @Prop({ type: Boolean, default: false })
  isActive?: boolean;

  // Todo: Add User Management schema ref when it is defined
  @Prop({ type: SchemaTypes.ObjectId, required: false })
  createdBy?: string;

  // Todo: Add User Management schema ref when it is defined
  @Prop({ type: SchemaTypes.ObjectId, required: false })
  updatedBy?: string;

  // Todo: Add User Management schema ref when it is defined
  @Prop({ type: SchemaTypes.ObjectId, required: false })
  deletedBy?: string;

  // Todo: Add User Management schema ref when it is defined
  @Prop({ type: Boolean, default: false })
  isDeleted?: boolean;
}

export const QuickLinksSchema = SchemaFactory.createForClass(QuickLinks);
