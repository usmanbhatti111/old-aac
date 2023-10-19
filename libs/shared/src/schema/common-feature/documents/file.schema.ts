import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { MODEL } from '@shared/constants';
import { HydratedDocument, SchemaTypes } from 'mongoose';
import { Folder } from './folder.schema';
import { AbstractSchema } from '../../abstract-repo/abstract.schema';
import { Organization } from '../../organization';
import { User } from '../../user-account';

export type FileDocument = HydratedDocument<File>;

@Schema({})
export class File extends AbstractSchema {
  @Prop()
  name: string;

  @Prop({ default: Date.now })
  createdAt?: Date;

  @Prop({ required: false, type: SchemaTypes.ObjectId, ref: User.name })
  createdBy?: string;

  @Prop({ required: false, default: Date.now })
  updatedAt?: Date;

  @Prop()
  media: string;

  @Prop({
    type: SchemaTypes.ObjectId,
    required: true,
    ref: Folder.name,
  })
  folderId: string;

  @Prop({
    type: SchemaTypes.ObjectId,
    required: true,
    ref: Organization.name,
  })
  organizationId: string;

  @Prop({ type: Number, required: false, default: 0 })
  sharedLinks?: number;

  @Prop({ type: Number, required: false, default: 0 })
  readsCount?: number;
}

export const FileSchema = SchemaFactory.createForClass(File);
