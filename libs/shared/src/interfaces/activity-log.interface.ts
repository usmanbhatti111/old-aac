import { Document, Types } from 'mongoose';

export interface ICreateActivityLog {
  entityId: Types.ObjectId | string;
  activity: string;
  performedBy: Types.ObjectId | string;
}
