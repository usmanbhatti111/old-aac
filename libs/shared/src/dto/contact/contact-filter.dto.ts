import { ApiProperty } from '@nestjs/swagger';
import { IsISO8601, IsOptional, IsString } from 'class-validator';
import { paginationDTO } from '../pagination/pagination.dto';
import { toMongoObjectId } from '../../functions';
import { Transform } from 'class-transformer';

export class ContactFilterDto extends paginationDTO {
  @ApiProperty({
    required: false,
    example: '5f8b14d073bce3c5f404f78r',
  })
  @IsOptional()
  @Transform(toMongoObjectId, { toClassOnly: true })
  contactOwnerId: string;

  @ApiProperty({
    required: false,
    example: '5f8b14d073bce3c5f404f78c',
  })
  @IsOptional()
  @Transform(toMongoObjectId, { toClassOnly: true })
  lifeCycleStageId: string;

  @ApiProperty({
    required: false,
    example: '5f8b14d073bce3c5f404f78c',
  })
  @IsOptional()
  @Transform(toMongoObjectId, { toClassOnly: true })
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
  @Transform(toMongoObjectId, { toClassOnly: true })
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

  @ApiProperty({
    example: 'search',
    required: false,
  })
  @IsOptional()
  @IsString()
  search: string;
}
