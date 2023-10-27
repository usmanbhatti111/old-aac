import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';
import { AbstractSchema } from '../abstract-repo/abstract.schema';
import { INote } from '../../dto/deals';
export type NoteDocument = HydratedDocument<Note>;

@Schema({
  versionKey: false,
  timestamps: true,
})
export class Note extends AbstractSchema implements INote {
  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String, required: false })
  description?: string;

  @Prop({ type: String, required: false })
  fileUrl?: string;

  @Prop({ type: Date, required: false })
  deletedAt?: Date;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'users' })
  createdBy?: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'users' })
  updatedBy?: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'users' })
  deletedBy?: string;

  @Prop({ type: Boolean, default: false })
  isDeleted?: boolean;
}

export const NoteSchema = SchemaFactory.createForClass(Note);
