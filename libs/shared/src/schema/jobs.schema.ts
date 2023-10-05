import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';
// import { Admin } from './admin.model'; // Import the Admin model if needed
// import { JobApplicant } from './job-applicant.model'; // Import the JobApplicant model if needed

export type JobDocument = HydratedDocument<Job>;
@Schema()
export class Job {
  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String, required: true })
  job_type: string;

  @Prop({ type: String, required: true })
  job_category: string;

  @Prop({ type: String, required: true })
  experience: string;

  @Prop({ type: Number })
  number_of_vacancy: number;

  @Prop({ type: Date })
  deadline: Date;

  @Prop({ type: String, default: 'OPEN' })
  status: string;

  @Prop({ type: Boolean, default: false })
  isDeleted: boolean;

  @Prop({ type: String })
  description: string;

  //   @Prop({ type: [{ type: Schema.Types.ObjectId, ref: 'JobApplicant' }] })
  //   applicants: JobApplicant[];

  //   // Define relationships if needed
  //   @Prop({ type: Schema.Types.ObjectId, ref: 'Admin' })
  //   created_by: Admin;
}

export const JobSchema = SchemaFactory.createForClass(Job);

JobSchema.index({ title: 'text', description: 'text' });
