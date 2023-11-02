import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsISO8601,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { paginationDTO } from '../pagination/pagination.dto';
import { EJobCategories, EJobStatus } from '../../constants/enums';
import { PaginationDto } from '../common';
import { toMongoObjectId } from '../../functions';
import { Transform } from 'class-transformer';

export class GetJobsDto extends PaginationDto {
  @ApiProperty({
    enum: EJobCategories,
    required: false,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  jobCategory: string;

  @ApiProperty({
    required: false,
    example: '5f8b14d073bce3c5f404f78c',
  })
  @IsOptional()
  @Transform(toMongoObjectId)
  createdBy: string;

  @ApiProperty({
    required: false,
    example: '2023-10-02',
  })
  @IsNotEmpty()
  @IsOptional()
  @IsDateString()
  dateStart: string;

  @ApiProperty({
    required: false,
    example: '2023-10-03',
  })
  @IsNotEmpty()
  @IsOptional()
  @IsDateString()
  dateEnd: string;

  @ApiProperty({
    enum: EJobStatus,
    required: false,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  status: string;

  @ApiProperty({
    example: 'dev',
    required: false,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  search: string;
}
