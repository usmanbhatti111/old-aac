import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractSchema } from '../abstract-repo/abstract.schema';
import mongoose, { HydratedDocument, SchemaTypes } from 'mongoose';

export type SoftwareUserDocument = HydratedDocument<SoftwareUsers>;
@Schema({
  versionKey: false,
  timestamps: true,
})
export class SoftwareUsers extends AbstractSchema {
  @Prop({ type: SchemaTypes.ObjectId, ref: 'users', required: true })
  userRefId?: string;
  @Prop({ type: String, required: true })
  softwareId?: string;
  @Prop({
    type: SchemaTypes.ObjectId,
    ref: 'contracts',
    required: false,
    default: '',
  })
  contractId?: string;
  @Prop({ type: String, required: true })
  userId?: string;
  @Prop({ type: Boolean, required: true })
  isContractAllocated?: boolean;
}

export const SoftwareUsersSchema = SchemaFactory.createForClass(SoftwareUsers);
