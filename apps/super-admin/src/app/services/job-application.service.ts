import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { JobApplicationsRepository } from '@shared';
import { MODEL, ResponseMessage, successResponse } from '@shared/constants';
import {
  CreateJobApplicationDto,
  GetJobApplicationsDto,
  MediaObject,
} from '@shared/dto';
import { S3Service } from '@shared/services';
import dayjs from 'dayjs';

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

  async getJobApplications(payload: GetJobApplicationsDto) {
    try {
      const limit = payload?.limit;
      const offset = payload?.page;

      const filterQuery = { isDeleted: false };

      if (payload?.candidateId) {
        filterQuery['createdBy'] = payload.candidateId;
      }

      if (payload?.status) {
        filterQuery['status'] = payload.status;
      }

      if (payload?.dateStart && payload?.dateEnd) {
        const startDate = dayjs(payload.dateStart).startOf('day').toDate();
        const endDate = dayjs(payload.dateEnd).endOf('day').toDate();

        filterQuery['createdAt'] = {
          $gte: startDate,
          $lte: endDate,
        };
      }

      const candidatePipline = [
        {
          $lookup: {
            from: MODEL.USER,
            localField: 'createdBy',
            foreignField: '_id',
            as: 'candidate',
            pipeline: [
              {
                $project: {
                  _id: 1,
                  name: {
                    $concat: [
                      { $ifNull: ['$firstName', ''] },
                      ' ',
                      { $ifNull: ['$lastName', ''] },
                    ],
                  },
                  // replace log with user field when profile image add in user model
                  profileImage: { $ifNull: ['$logo', ''] },
                },
              },
            ],
          },
        },
        {
          $unwind: {
            path: '$candidate',
            preserveNullAndEmptyArrays: true,
          },
        },
      ];

      const jobPipeline = [
        {
          $lookup: {
            from: MODEL.JOBS,
            localField: 'jobId',
            foreignField: '_id',
            as: 'job',
          },
        },
        {
          $unwind: {
            path: '$job',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $addFields: {
            jobTitle: { $ifNull: ['$job.title', ''] },
            jobPostedDate: { $ifNull: ['$job.createdAt', ''] },
          },
        },
        {
          $project: {
            job: 0,
          },
        },
      ];

      let searchPipeline = [];

      if (payload?.search) {
        const search = { $regex: payload.search, $options: 'i' };

        searchPipeline = [
          {
            $match: {
              $or: [{ jobTitle: search }, { 'candidate.name': search }],
            },
          },
        ];
      }

      const pipelines = [
        ...candidatePipline,
        ...jobPipeline,
        ...searchPipeline,
      ];

      const response = await this.jobApplicationRepository.paginate({
        filterQuery,
        limit,
        offset,
        pipelines,
      });

      return successResponse(HttpStatus.OK, ResponseMessage.SUCCESS, response);
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
