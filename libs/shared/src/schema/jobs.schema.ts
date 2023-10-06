import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { AbstractSchema } from './abstract-repo/abstract.schema';
// import { Admin } from './admin.model'; // Import the Admin model if needed
// import { JobApplicant } from './job-applicant.model'; // Import the JobApplicant model if needed

export type JobDocument = HydratedDocument<Job>;
@Schema()
export class Job extends AbstractSchema {
  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String, required: true })
  jobType: string;

  @Prop({ type: String, required: true })
  jobCategory: string;

  @Prop({ type: String, required: true })
  experience: string;

  @Prop({ type: Number })
  numberOfVacancy: number;

  @Prop({ type: Date })
  deadline: Date;

  @Prop({ type: String, default: 'OPEN' })
  status?: string;

  @Prop({ type: Boolean, default: false })
  isDeleted?: boolean;

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
