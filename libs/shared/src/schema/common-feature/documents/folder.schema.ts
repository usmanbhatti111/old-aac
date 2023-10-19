import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';
import { AbstractSchema } from '../../abstract-repo/abstract.schema';
import { Organization } from '../../organization';

export type FolderDocument = HydratedDocument<Folder>;

@Schema({})
export class Folder extends AbstractSchema {
  @Prop()
  name: string;

  @Prop({ default: Date.now })
  createdAt?: Date;

  @Prop({ required: false, type: SchemaTypes.ObjectId })
  createdBy?: string;

  @Prop({ required: false, default: Date.now })
  updatedAt?: Date;

  @Prop({
    type: SchemaTypes.ObjectId,
    required: false,
    ref: 'folders',
    default: null,
  })
  parentFolderId: string;

  @Prop({
    type: SchemaTypes.ObjectId,
    required: true,
    ref: Organization.name,
  })
  organizationId: string;
}

export const FolderSchema = SchemaFactory.createForClass(Folder);
