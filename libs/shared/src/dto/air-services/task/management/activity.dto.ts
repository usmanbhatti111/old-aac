import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';
import { PaginationDto } from '../../../common';

export class GetTaskActivitytDto {
  @ApiProperty({
    type: String,
    example: '',
    required: false,
  })
  @IsString()
  @IsOptional()
  taskId?: string;

  @ApiProperty({
    example: '',
    required: false,
  })
  @IsOptional()
  search: string;
}
