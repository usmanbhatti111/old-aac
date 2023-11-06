import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';
import { AbstractSchema } from '../../abstract-repo/abstract.schema';
import { Organization } from '../../organization';
import { EFolderType } from '@shared/constants';

export type FolderDocument = HydratedDocument<Folder>;

@Schema({
  versionKey: false,
  timestamps: true,
})
export class Folder extends AbstractSchema {
  @Prop()
  name: string;

  @Prop({ required: false, type: SchemaTypes.ObjectId })
  createdBy?: string;

  @Prop({
    type: SchemaTypes.ObjectId,
    required: false,
    ref: 'folders',
    default: null,
  })
  parentFolderId: string;

  @Prop({
    type: SchemaTypes.ObjectId,
    required: false,
    ref: Organization.name,
  })
  organizationId: string;

  @Prop({
    type: String,
    required: false,
    enum: EFolderType,
  })
  type: string;
}

export const FolderSchema = SchemaFactory.createForClass(Folder);
