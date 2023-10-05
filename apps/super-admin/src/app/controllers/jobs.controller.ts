import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RMQ_MESSAGES } from '@shared/constants';
import { JobsService } from '../services/jobs.service';
import { CreateJobDto, FilterJobsDto, IdDTO, UpdateJobDto } from '@shared/dto';

@Controller()
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @MessagePattern({ cmd: RMQ_MESSAGES.JOBS.CREATE_JOB })
  async createJob(@Payload() payload: CreateJobDto) {
    return await this.jobsService.createJob(payload);
  }

  @MessagePattern({ cmd: RMQ_MESSAGES.JOBS.GET_JOB })
  async getJob(@Payload() payload: IdDTO) {
    return await this.jobsService.getJob(payload);
  }

  @MessagePattern({ cmd: RMQ_MESSAGES.JOBS.GET_JOBS })
  async getJobs(@Payload() payload: FilterJobsDto) {
    return await this.jobsService.getJobs(payload);
  }

  @MessagePattern({ cmd: RMQ_MESSAGES.JOBS.UPDATE_JOB })
  async updateJob(@Payload() payload: UpdateJobDto) {
    return await this.jobsService.updateJob(payload);
  }

  @MessagePattern({ cmd: RMQ_MESSAGES.JOBS.DELETE_JOB })
  async deleteJobs(@Payload() payload: IdDTO) {
    return await this.jobsService.deleteJob(payload);
  }
}
