import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';
import { BillingCycleEnum, OrganizationPlanStatusEnum } from '../../constants';

export type OrganizationPlanDocument = HydratedDocument<OrganizationPlan>;

@Schema({ timestamps: true })
export class OrganizationPlan {
  @Prop({
    type: SchemaTypes.ObjectId,
    // ref: Organization.name
  })
  organizationId: string;

  @Prop({
    type: SchemaTypes.ObjectId,
    // ref: Plan.name
  })
  planId: string;

  @Prop({ type: Number, required: false, default: 0 })
  additionalUsers?: number;

  @Prop({ type: Number, required: false, default: 0 })
  additionalStorage?: number;

  @Prop({ type: Number, required: false, default: 0 })
  planDiscount: number;

  @Prop({
    type: String,
    required: false,
    enum: BillingCycleEnum,
    default: BillingCycleEnum.MONTHLY,
  })
  billingCycle: BillingCycleEnum;

  @Prop({ type: Date, required: true })
  billingDate: Date;

  @Prop({
    type: String,
    required: false,
    enum: OrganizationPlanStatusEnum,
    default: OrganizationPlanStatusEnum.ACTIVE,
  })
  status: OrganizationPlanStatusEnum;

  @Prop({
    type: SchemaTypes.ObjectId,
    required: true,
    // ref: Admin.name
  })
  assignedBy: string;

  @Prop({ type: Date, required: false })
  deletedAt: Date;
}

export const OrganizationPlanSchema =
  SchemaFactory.createForClass(OrganizationPlan);
