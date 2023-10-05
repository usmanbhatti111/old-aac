import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ExampleDocument = HydratedDocument<Example>;

@Schema()
export class Example {
  @Prop()
  title: string;

  @Prop()
  description: string;
}

export const ExampleSchema = SchemaFactory.createForClass(Example);
