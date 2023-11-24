import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { AbstractSchema } from '../abstract-repo/abstract.schema';
import { HydratedDocument, SchemaTypes } from 'mongoose';
import { MODEL } from '../../constants/models';

export type ImportFileDocument = HydratedDocument<ImportFile>;

@Schema({ versionKey: false, timestamps: true })
export class ImportFile extends AbstractSchema {

  @Prop({ type: SchemaTypes.ObjectId, ref: MODEL.USER })
  userId?: string;

  @Prop({
    type: SchemaTypes.ObjectId,
    required: true,
    ref: MODEL.ORGANIZATION,
  })
  organizationId: string;

  @Prop({ type: String, required: true })
  filePath: string;

  @Prop({ type: Array, required: true })
  dataColumn: string[];

  @Prop({ type: String, required: true, default: 'pending' })
  status?: string;

  @Prop({ type: String, required: true })
  actionType: string;

  @Prop({ type: Array, required: false })
  failedRecords?: [];
}

export const ImportFileSchema = SchemaFactory.createForClass(ImportFile);
