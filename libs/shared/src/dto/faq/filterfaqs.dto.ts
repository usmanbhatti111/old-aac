import { ApiProperty } from '@nestjs/swagger';
import { IsISO8601, IsOptional } from 'class-validator';
import { paginationDTO } from '../pagination/pagination.dto';
import {
  EFaqCategories,
  EJobCategories,
  EJobStatus,
} from '../../constants/enums';

export class FilterFaqsDto extends paginationDTO {
  @ApiProperty({
    enum: EFaqCategories,
    required: false,
  })
  @IsOptional()
  faqCategory: string;

  @ApiProperty({
    required: false,
    example: '5f8b14d073bce3c5f404f78c',
  })
  @IsOptional()
  createdById: string;

  @ApiProperty({
    example: '2023-09-28',
    required: false,
  })
  @IsOptional()
  @IsISO8601()
  createdAt: string;

  @ApiProperty({
    example: 'what is reactjs',
    required: false,
  })
  @IsOptional()
  search: string;
}
