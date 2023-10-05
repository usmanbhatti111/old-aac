import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SupserAdminDocument = HydratedDocument<SuperAdmin>;

@Schema()
export class SuperAdmin {
  @Prop()
  role: string;

  @Prop()
  is_product_owner: string;

  @Prop()
  first_name: string;

  @Prop()
  last_name: string;
}

export const SuperAdminSchema = SchemaFactory.createForClass(SuperAdmin);
