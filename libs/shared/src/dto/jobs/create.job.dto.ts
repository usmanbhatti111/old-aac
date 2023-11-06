import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import {
  IsDateString,
  IsISO8601,
  IsInt,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import {
  EExperienceLevel,
  EJobCategories,
  EJobStatus,
  EJobType,
} from '../../constants/enums';
import { Transform, Type } from 'class-transformer';
import { toMongoObjectId } from '../../functions';

export class CreateJobDto {
  @ApiProperty({
    required: true,
    example: 'reactjs dev',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    enum: EJobType,
    type: String,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  jobType: string;

  @ApiProperty({
    enum: EJobCategories,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  jobCategory: string;

  @ApiProperty({
    enum: EExperienceLevel,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  experience: string;

  @ApiProperty({
    example: 1,
    required: false,
  })
  @IsNotEmpty()
  @Type(() => Number)
  @IsOptional()
  @IsInt()
  numberOfVacancy: number;

  @ApiProperty({
    type: Date,
    required: true,
    example: new Date(),
  })
  @IsNotEmpty()
  @IsDateString()
  deadline: Date;

  @ApiProperty({
    example: '<h1>This is the description for job</h1>',
    required: false,
  })
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  description: string;

  @Transform(toMongoObjectId)
  createdBy: string;
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
