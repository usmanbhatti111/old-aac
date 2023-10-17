import { ApiProperty } from '@nestjs/swagger';
import { IsISO8601, IsOptional } from 'class-validator';

export class GetTaskDto {
  @ApiProperty({
    type: String,
    required: false,
    example: '',
  })
  @IsOptional()
  assignee: string;

  @ApiProperty({
    type: String,
    required: false,
    example: '',
  })
  @IsOptional()
  status: string;

  @ApiProperty({
    type: String,
    required: false,
    example: '',
  })
  @IsOptional()
  priority: string;

  @ApiProperty({
    type: Date,
    required: false,
  })
  @IsISO8601()
  startDate: Date;

  @ApiProperty({
    example: '',
    required: false,
  })
  @IsOptional()
  search: string;
}
