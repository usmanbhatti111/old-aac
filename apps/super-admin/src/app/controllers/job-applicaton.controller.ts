import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RMQ_MESSAGES } from '@shared/constants';
import { JobApplicationsService } from '../services/job-application.service';
import { CreateJobApplicationDto, GetJobApplicationsDto } from '@shared/dto';

@Controller()
export class JobApplicationsController {
  constructor(
    private readonly jobApplicatoinsService: JobApplicationsService
  ) {}

  @MessagePattern(
    RMQ_MESSAGES.SUPER_ADMIN.JOB_APPLICATIONS.CREATE_JOB_APPLICATION
  )
  async createJobApplication(@Payload() payload: CreateJobApplicationDto) {
    return await this.jobApplicatoinsService.createJobApplication(payload);
  }

  @MessagePattern(RMQ_MESSAGES.SUPER_ADMIN.JOB_APPLICATIONS.GET_JOB_APPLICATION)
  async getJobApplications(@Payload() payload: GetJobApplicationsDto) {
    return await this.jobApplicatoinsService.getJobApplications(payload);
  }
}
