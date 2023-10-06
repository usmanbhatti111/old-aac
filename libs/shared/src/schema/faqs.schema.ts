import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { AbstractSchema } from './abstract-repo/abstract.schema';
// import { Admin } from './admin.model'; // Import the Admin model if needed
// import { JobApplicant } from './job-applicant.model'; // Import the JobApplicant model if needed

@Schema({ timestamps: true })
export class Faq extends AbstractSchema {
  @Prop({ type: String, required: true })
  faqQuestion: string;

  @Prop({ type: String, required: true })
  faqCategory: string;

  @Prop({ type: String, required: true })
  faqAnswer: string;

  @Prop({ type: String, required: true })
  createdById: string;

  @Prop({ type: Boolean, default: false })
  isDeleted?: boolean;

  //   // Define relationships if needed
  //   @Prop({ type: Schema.Types.ObjectId, ref: 'Admin' })
  //   created_by: Admin;
}

export const FaqSchema = SchemaFactory.createForClass(Faq);
