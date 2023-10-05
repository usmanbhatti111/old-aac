import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
// import { Admin } from './admin.model'; // Import the Admin model if needed
// import { JobApplicant } from './job-applicant.model'; // Import the JobApplicant model if needed

@Schema({ timestamps: true })
export class Faq extends Document {
  @Prop({ type: String, required: true })
  faq_question: string;

  @Prop({ type: String, required: true })
  faq_category: string;

  @Prop({ type: String, required: true })
  faq_answer: string;

  @Prop({ type: String, required: true })
  created_by_id: string;

  @Prop({ type: Boolean, default: false })
  isDeleted: boolean;

  //   // Define relationships if needed
  //   @Prop({ type: Schema.Types.ObjectId, ref: 'Admin' })
  //   created_by: Admin;
}

export const FaqSchema = SchemaFactory.createForClass(Faq);

FaqSchema.index({
  faq_question: 'text',
  faq_category: 'text',
  faq_answer: 'text',
});
