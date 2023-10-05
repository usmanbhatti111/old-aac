import { ApiProperty } from '@nestjs/swagger';
import { IsISO8601, IsOptional } from 'class-validator';
import { paginationDTO } from '../pagination/pagination.dto';
import { EJobCategories, EJobStatus } from '../../constants/enums';

export class FilterJobsDto extends paginationDTO {
  @ApiProperty({
    enum: EJobCategories,
    required: false,
  })
  @IsOptional()
  job_category: string;

  @ApiProperty({
    required: false,
    example: '5f8b14d073bce3c5f404f78c',
  })
  @IsOptional()
  created_by_id: string;

  @ApiProperty({
    example: '2023-09-28',
    required: false,
  })
  @IsOptional()
  @IsISO8601()
  createdAt: string;

  @ApiProperty({
    enum: EJobStatus,
    required: false,
  })
  @IsOptional()
  status: string;

  @ApiProperty({
    example: 'dev',
    required: false,
  })
  @IsOptional()
  search: string;
}
