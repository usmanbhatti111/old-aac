import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsISO8601,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { ETaskAssociate, ETaskStatus, ETaskType } from '../../../../constants';

export class EditTaskManagementDto {
  @ApiProperty({
    type: String,
    example: '',
    required: false,
  })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({
    type: String,
    example: ETaskType.CALL,
    required: false,
  })
  @IsString()
  @IsOptional()
  @IsEnum(ETaskType)
  type: string;

  @ApiProperty({
    type: String,
    example: '',
    required: false,
  })
  @IsString()
  @IsOptional()
  priority: string;

  @ApiProperty({
    type: String,
    example: '',
    required: false,
  })
  @IsString()
  @IsOptional()
  @IsEnum(ETaskStatus)
  status?: string;

  @ApiProperty({
    type: String,
    example: '',
    required: false,
  })
  @IsString()
  @IsOptional()
  deal?: string;

  @ApiProperty({
    type: String,
    example: '',
    required: false,
  })
  @IsString()
  @IsOptional()
  @IsEnum(ETaskAssociate)
  associate?: string;

  @ApiProperty({
    type: String,
    example: '',
    required: false,
  })
  @IsString()
  @IsOptional()
  assignTo?: string;

  @ApiProperty({
    type: Date,
    required: false,
    example: '',
  })
  @IsISO8601()
  @IsOptional()
  dueDate?: Date;

  @ApiProperty({
    type: String,
    example: '',
    required: false,
  })
  @IsString()
  @IsOptional()
  time?: string;

  @ApiProperty({
    type: String,
    example: '',
    required: false,
  })
  @IsString()
  @IsOptional()
  reminder?: string;

  @ApiProperty({
    type: String,
    example: '',
    required: false,
  })
  @IsString()
  @IsOptional()
  note?: string;

  updatedById: string;
}
