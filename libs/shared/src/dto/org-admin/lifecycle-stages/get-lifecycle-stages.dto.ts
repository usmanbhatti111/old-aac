import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { PaginationDto } from '../../common';

export class GetLifecycleStagesDto extends PaginationDto {
  @ApiProperty({
    type: String,
    required: false,
    description: 'Search By name or description',
  })
  @IsNotEmpty()
  @IsOptional()
  search: string;

  userId: string;
}
