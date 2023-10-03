import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationDto {
  @ApiProperty({
    required: false,
    example: 1,
    description: 'Get record of specific page',
  })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  page: number;

  @ApiProperty({
    required: false,
    example: 10,
    description: 'Number of records per page',
  })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  limit: number;
}
