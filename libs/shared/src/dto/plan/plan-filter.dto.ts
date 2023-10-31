import { ApiProperty } from '@nestjs/swagger';
import { IsISO8601, IsOptional, IsString } from 'class-validator';
import { paginationDTO } from '../pagination/pagination.dto';
import { Transform } from 'class-transformer';
import { toMongoObjectId } from '../../functions';

export class PlanFilterDto extends paginationDTO {
  @ApiProperty({
    required: false,
    example: '5f8b14d073bce3c5f404f78r',
  })
  @IsOptional()
  @Transform(toMongoObjectId, { toClassOnly: true })
  productId: string;

  @ApiProperty({
    required: false,
    example: '5f8b14d073bce3c5f404f78c',
  })
  @IsOptional()
  planTypeId: string;

  @ApiProperty({
    example: '2023-09-28',
    required: false,
  })
  @IsOptional()
  @IsISO8601()
  createdAt: string;

  @ApiProperty({
    example: 'dev',
    required: false,
  })
  @IsOptional()
  @IsString()
  search: string;
}
