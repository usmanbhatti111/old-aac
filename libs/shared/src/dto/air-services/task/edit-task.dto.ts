import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsISO8601, IsOptional } from 'class-validator';

export class EditTaskDto {
  @ApiProperty({
    type: String,
    example: '',
    required: false,
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({
    type: String,
    example: '',
    required: false,
  })
  @IsString()
  @IsOptional()
  ticketId?: string;

  @ApiProperty({
    type: String,
    example: '.',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    type: String,
    example: '',
    required: false,
  })
  @IsString()
  @IsOptional()
  workSpace?: string;

  @ApiProperty({
    type: String,
    example: '',
    required: false,
  })
  @IsString()
  @IsOptional()
  assignTo?: string;

  @ApiProperty({
    type: String,
    example: '',
    required: false,
  })
  @IsString()
  @IsOptional()
  status?: string;

  @ApiProperty({
    type: String,
    example: '',
    required: false,
  })
  @IsString()
  @IsOptional()
  notifyBefore?: string;

  @ApiProperty({
    type: Date,
    required: false,
  })
  @IsISO8601()
  @IsOptional()
  startDate?: Date;

  @ApiProperty({
    type: Date,
    required: false,
  })
  @IsISO8601()
  @IsOptional()
  endDate?: Date;

  @ApiProperty({
    type: String,
    example: '',
    required: false,
  })
  @IsString()
  @IsOptional()
  plannedEffort?: string;
}
