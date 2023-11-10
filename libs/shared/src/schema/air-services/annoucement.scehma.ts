import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';
import { AbstractSchema } from '../abstract-repo/abstract.schema';
export type AnnoucementDocument = HydratedDocument<Annoucement>;

@Schema({ versionKey: false, timestamps: true })
export class Annoucement extends AbstractSchema {
  @Prop({ type: String, required: false })
  title: string;

  @Prop({
    type: String,
    required: false,
  })
  description: string;

  @Prop({ type: String, required: true })
  startDate: Date;
  @Prop({ type: String, required: false })
  endDate: Date;
  @Prop({ type: SchemaTypes.ObjectId, required: false })
  managedById: string;
  @Prop({ type: SchemaTypes.ObjectId, required: false })
  vibilityId: string;

  @Prop({
    type: Boolean,
    default: false,
  })
  notifyMembers: boolean;
  @Prop({
    type: String,
    required: false,
  })
  additionalEmail: string;
  @Prop({
    type: String,
    required: false,
  })
  addMember: string;
}

export const AnnoucementSchema = SchemaFactory.createForClass(Annoucement);
