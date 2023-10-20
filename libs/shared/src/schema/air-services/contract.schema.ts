import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';
import { AbstractSchema } from '../abstract-repo/abstract.schema';
import { EExtendRenewStatus } from '../../constants/index';
import { Inventory } from './inventory.schema';
import { EContractStatus } from '../../constants/enums';
export type ContractDocument = HydratedDocument<Contract>;

@Schema({
  versionKey: false,
  timestamps: true,
})
export class Contract extends AbstractSchema {
  @Prop({ type: String, required: false })
  name: string;

  @Prop({ type: String, required: false })
  type: string;

  @Prop({ type: String, required: false })
  cost: string;

  @Prop()
  startDate: Date;

  @Prop()
  endDate: Date;

  @Prop({ type: String, required: false })
  contractNumber: string;

  @Prop({
    type: [{ type: SchemaTypes.ObjectId }],
    required: false,
  })
  attachments: string[];

  @Prop({
    type: String,
    required: false,
    default: EContractStatus.DRAFT,
    enum: EContractStatus,
  })
  status?: string;

  @Prop({ type: SchemaTypes.ObjectId, required: false })
  vendor: string;

  @Prop({ type: SchemaTypes.ObjectId, required: false })
  approver: string;

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

  @Prop({
    type: String,
    required: false,
    enum: EExtendRenewStatus,
    default: EExtendRenewStatus.NULL,
  })
  statusRenewExtend?: string;

  @Prop({ type: SchemaTypes.ObjectId, required: false })
  assetId: string;

  @Prop({
    type: Boolean,
    default: false,
  })
  isDeleted?: boolean;
}

export const ContractSchema = SchemaFactory.createForClass(Contract);
