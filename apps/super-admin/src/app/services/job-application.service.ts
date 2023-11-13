import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { JobApplicationsRepository } from '@shared';
import { ResponseMessage, successResponse } from '@shared/constants';
import { CreateJobApplicationDto, MediaObject } from '@shared/dto';
import { S3Service } from '@shared/services';

@Injectable()
export class JobApplicationsService {
  constructor(
    private jobApplicationRepository: JobApplicationsRepository,
    private s3: S3Service
  ) {}

  async createJobApplication(payload: CreateJobApplicationDto) {
    try {
      const filterQuery = {
        createdBy: payload.createdBy,
        jobId: payload.jobId,
      };

      const alreadyApplied =
        await this.jobApplicationRepository.findOneWithoutException(
          filterQuery
        );

      if (alreadyApplied) {
        throw new BadRequestException('User Already Applied for this job');
      }

      const { files } = payload;

      if (files['resume']) {
        const file = files['resume'][0];

        const s3Response = await this.s3.uploadFile(file, 'resumes/{uuid}');

        const resume: MediaObject = {
          ...s3Response,
          size: file.size,
          mimetype: file.mimetype,
        };

        payload.resume = resume;
      }

      if (files['coverLetter']) {
        const file = files['coverLetter'][0];

        const s3Response = await this.s3.uploadFile(
          file,
          'coverLetters/{uuid}'
        );

        const coverLetter: MediaObject = {
          ...s3Response,
          size: file.size,
          mimetype: file.mimetype,
        };

        payload.coverLetter = coverLetter;
      }

      const res = await this.jobApplicationRepository.create(payload);

      return successResponse(HttpStatus.CREATED, ResponseMessage.CREATED, res);
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
