import { ApiProperty } from '@nestjs/swagger';
import { IsISO8601, IsOptional } from 'class-validator';
import { paginationDTO } from '../pagination/pagination.dto';

export class ContactFilterDto extends paginationDTO {
  @ApiProperty({
    required: false,
    example: '5f8b14d073bce3c5f404f78r',
  })
  @IsOptional()
  contactOwnerId: string;

  @ApiProperty({
    required: false,
    example: '5f8b14d073bce3c5f404f78c',
  })
  @IsOptional()
  lifeCycleStageId: string;

  @ApiProperty({
    required: false,
    example: '5f8b14d073bce3c5f404f78c',
  })
  @IsOptional()
  statusId: string;

  @ApiProperty({
    example: '2023-09-28',
    required: false,
  })
  @IsOptional()
  @IsISO8601()
  createdAt: string;

  @ApiProperty({
    required: false,
    example: '5f8b14d073bce3c5f404f78r',
  })
  @IsOptional()
  createdBy: string;

  @ApiProperty({
    example: '2023-09-28',
    required: false,
  })
  @IsOptional()
  @IsISO8601()
  lastActivityDate: string;

  @ApiProperty({
    example: '2023-09-28',
    required: false,
  })
  @IsOptional()
  @IsISO8601()
  nextActivityDate: string;

  @IsOptional()
  search: string;
}
