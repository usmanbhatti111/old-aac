import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
export class PaginationDto {
  @ApiProperty({ default: 0, required: false })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  page: number;

  @ApiProperty({ default: 10, required: false })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  limit: number;
}
