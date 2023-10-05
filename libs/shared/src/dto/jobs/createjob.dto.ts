import { ApiProperty } from '@nestjs/swagger';
import { IsISO8601, IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';
import {
  EExperienceLevel,
  EJobCategories,
  EJobType,
} from '../../constants/enums';

export class CreateJobDto {
  @ApiProperty({
    required: true,
    example: 'reactjs dev',
  })
  title: string;

  @ApiProperty({
    enum: EJobType,
    type: String,
    required: true,
  })
  job_type: string;

  @ApiProperty({
    enum: EJobCategories,
    required: true,
  })
  job_category: string;

  @ApiProperty({
    enum: EExperienceLevel,
    required: true,
  })
  experience: string;

  @ApiProperty({
    example: 1,
  })
  number_of_vacancy: number;

  @ApiProperty({
    example: '2023-09-27T12:00:00Z',
    required: false,
  })
  @IsISO8601()
  deadline: string;

  @ApiProperty({
    example: '<h1>This is the description for job</h1>',
  })
  description: string;

  @ApiProperty({
    example: '5f8b14d073bce3c5f404f78c',
  })
  created_by_id: string;
}

export class UpdateJobDto {
  @ApiProperty({
    required: true,
    example: '65152939f50394f42cee2db4',
  })
  id: string;

  @ApiProperty({
    example: 'reactjs dev',
  })
  @IsOptional()
  title: string;

  @ApiProperty({
    enum: EJobType,
    type: String,
  })
  @IsOptional()
  job_type: string;

  @ApiProperty({
    enum: EJobCategories,
  })
  @IsOptional()
  job_category: string;

  @ApiProperty({
    enum: EExperienceLevel,
  })
  @IsOptional()
  experience: string;

  @ApiProperty({
    example: 1,
  })
  @IsOptional()
  number_of_vacancy: number;

  @ApiProperty({
    example: '2023-09-27T12:00:00Z',
  })
  @IsOptional()
  @IsISO8601()
  deadline: string;

  @ApiProperty({
    example: '<h1>This is the description for job</h1>',
  })
  @IsOptional()
  description: string;
}

export class CreateJobResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({ example: 'Success' })
  message: string;

  @ApiProperty({
    example: {
      _id: '65154bdc3064871640f8ce14',
      created_by_id: '65154bdc3064871640f8ce14',
      title: 'nodejs dev',
      job_type: 'FULL_TIME',
      job_category: 'SALES',
      experience: 'NO_EXPERIENCE',
      number_of_vacancy: 1,
      deadline: '2023-09-27T12:00:00Z',
      status: 'OPEN',
      isDeleted: 'false',
      description: '<h1>This is the description for job</h1>',
      created_at: '2023-09-27T12:00:00Z',
      updated_at: '2023-09-27T12:00:00Z',
    },
  })
  data: object;

  @ApiProperty({ example: null })
  errors: [];
}

export class GetJobResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({ example: 'Success' })
  message: string;

  @ApiProperty({
    example: {
      _id: '65154bdc3064871640f8ce14',
      created_by_id: '65154bdc3064871640f8ce14',
      title: 'nodejs dev',
      job_type: 'FULL_TIME',
      job_category: 'SALES',
      experience: 'NO_EXPERIENCE',
      number_of_vacancy: 1,
      deadline: '2023-09-27T12:00:00Z',
      status: 'OPEN',
      isDeleted: 'false',
      description: '<h1>This is the description for job</h1>',
      created_at: '2023-09-27T12:00:00Z',
      updated_at: '2023-09-27T12:00:00Z',
    },
  })
  data: object;

  @ApiProperty({ example: null })
  errors: [];
}

export class GetJobsResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({ example: 'Success' })
  message: string;

  @ApiProperty({
    example: [
      {
        _id: '65154bdc3064871640f8ce14',
        created_by_id: '65154bdc3064871640f8ce14',
        title: 'nodejs dev',
        job_type: 'FULL_TIME',
        job_category: 'SALES',
        experience: 'NO_EXPERIENCE',
        number_of_vacancy: 1,
        deadline: '2023-09-27T12:00:00Z',
        status: 'OPEN',
        isDeleted: 'false',
        description: '<h1>This is the description for job</h1>',
        created_at: '2023-09-27T12:00:00Z',
        updated_at: '2023-09-27T12:00:00Z',
      },
    ],
  })
  data: [object];

  @ApiProperty({ example: 8 })
  count: number;

  @ApiProperty({
    example: [
      {
        page: 1,
        limit: 10,
        totalPages: 1,
        resultCount: 8,
        totalResult: 8,
      },
    ],
  })
  pagination: object;

  @ApiProperty({ example: null })
  errors: [];
}

export class IdDTO {
  @ApiProperty({
    required: true,
    example: '65152930f50394f42cee2db3',
  })
  @IsNotEmpty()
  @IsMongoId()
  id: string;
}
