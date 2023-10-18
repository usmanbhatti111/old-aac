import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { AbstractSchema } from '../abstract-repo/abstract.schema';

export type ContractDocument = HydratedDocument<Contract>;

@Schema({
  versionKey: false,
  timestamps: true,
})
export class Contract extends AbstractSchema {
  @Prop({ type: String, required: false })
  name: string;

  @Prop({ type: String, required: true })
  number: string;

  @Prop({ type: String, required: true })
  type: string;

  @Prop({ type: String, required: true })
  associateAssets: string;

  @Prop({ type: String, required: true })
  cost: string;

  @Prop({ type: String, required: true })
  status: string;

  @Prop({ type: String, required: true })
  vendor: string;

  @Prop({ type: String, required: true })
  approver: string;

  @Prop({ type: String })
  startDate?: string;

  @Prop({ type: String })
  endDate?: string;

  @Prop({
    type: Boolean,
    default: false,
  })
  autoRenew: boolean;

  @Prop({
    type: Boolean,
    default: false,
  })
  notifyExpiry: boolean;

  @Prop({ type: String, required: true })
  assetId: string;
}

export const ContractSchema = SchemaFactory.createForClass(Contract);
