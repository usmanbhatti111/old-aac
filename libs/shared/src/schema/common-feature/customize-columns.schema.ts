import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { SchemaTypes } from 'mongoose';
import { ECustomizeColumnType, MODEL } from '../../constants';
import { AbstractSchema } from '../abstract-repo/abstract.schema';

class ColumnsObject {
  @Prop({ type: String, required: true })
  slug: string;

  @Prop({ type: String, required: true })
  attributes: string;

  @Prop({ type: Boolean, default: false })
  active?: boolean;

  @Prop({ type: Number, required: true })
  order: number;
}

@Schema({ versionKey: false, timestamps: true })
export class CustomizeColumns extends AbstractSchema {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: MODEL.USER,
    required: false,
  })
  userId?: string;

  @Prop({ type: String, enum: ECustomizeColumnType, required: true })
  type: string;

  @Prop({ type: [SchemaTypes.Mixed], required: true })
  columns: ColumnsObject[];

  @Prop({ type: Boolean, default: false })
  isDeleted?: boolean;
}

export const CustomizeColumnsSchema =
  SchemaFactory.createForClass(CustomizeColumns);

const dealDefaultColumns = {
  _id: 13213321321333213,
  type: 'deals',
  columns: [
    {
      slug: 'Deal Owner',
      attributes: 'dealOwner.name email profileImage',
      active: true,
      order: 1,
    },
    {
      slug: 'Deal Name',
      attributes: 'name',
      active: true,
      order: 2,
    },
    {
      slug: 'Contacted Person',
      attributes:
        'contactedPerson.name contactedPerson.email contactedPerson.profileImage',
      active: false,
      order: 3,
    },
    {
      slug: 'Priority',
      attributes: 'priority',
      active: false,
      order: 4,
    },
    {
      slug: 'Created Date',
      attributes: 'createdAt',
      active: false,
      order: 5,
    },
    {
      slug: 'Close Date',
      attributes: 'createdAt',
      active: false,
      order: 6,
    },
    {
      slug: 'Deal Stage',
      attributes: 'dealStage',
      active: true,
      order: 7,
    },
    {
      slug: 'Deal Pipeline',
      attributes: 'dealPipeline',
      active: true,
      order: 8,
    },
    {
      slug: 'Amount',
      attributes: 'amount',
      active: true,
      order: 9,
    },
  ],
};

const dealUserCustomizeColumns = {
  _id: 13213321321333213,
  userId: 1343123123213,
  type: 'deals',
  columns: [
    {
      slug: 'Deal Owner',
      attributes: 'dealOwner.name email profileImage',
      active: true,
      order: 1,
    },
    {
      slug: 'Deal Name',
      attributes: 'name',
      active: true,
      order: 2,
    },
    {
      slug: 'Contacted Person',
      attributes:
        'contactedPerson.name contactedPerson.email contactedPerson.profileImage',
      active: false,
      order: 3,
    },
    {
      slug: 'Priority',
      attributes: 'priority',
      active: false,
      order: 4,
    },
    {
      slug: 'Created Date',
      attributes: 'createdAt',
      active: false,
      order: 5,
    },
    {
      slug: 'Close Date',
      attributes: 'createdAt',
      active: false,
      order: 6,
    },
    {
      slug: 'Deal Stage',
      attributes: 'dealStage',
      active: true,
      order: 7,
    },
    {
      slug: 'Deal Pipeline',
      attributes: 'dealPipeline',
      active: true,
      order: 8,
    },
    {
      slug: 'Amount',
      attributes: 'amount',
      active: true,
      order: 9,
    },
  ],
};
