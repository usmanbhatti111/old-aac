import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { PaginationDto } from '../../common';
export class ListAssetTypeDto extends PaginationDto {
  @ApiProperty({
    example: '',
    required: false,
  })
  @IsOptional()
  search: string;
}
