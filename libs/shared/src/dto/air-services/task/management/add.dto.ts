import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsISO8601,
  IsOptional,
  IsEnum,
} from 'class-validator';
import {
  ETaskAssociate,
  ETaskReminder,
  ETaskStatus,
  ETaskType,
} from '../../../../constants';

export class AddTaskManagementDto {
  @ApiProperty({
    type: String,
    example: 'Title Name',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: String,
    example: ETaskType.CALL,
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @IsEnum(ETaskType)
  type: string;

  @ApiProperty({
    type: String,
    example: 'Title Name',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  priority: string;

  @ApiProperty({
    type: String,
    example: ETaskStatus.PENDING,
    required: false,
  })
  @IsString()
  @IsOptional()
  @IsEnum(ETaskStatus)
  status?: string;

  @ApiProperty({
    type: String,
    example: 'Title Name',
    required: false,
  })
  @IsString()
  @IsOptional()
  deal?: string;

  @ApiProperty({
    type: String,
    example: ETaskAssociate.COMPANIES,
    required: false,
  })
  @IsString()
  @IsOptional()
  @IsEnum(ETaskAssociate)
  associate?: string;

  @ApiProperty({
    type: String,
    example: '652627f809a15759b979dd3a',
    required: false,
  })
  @IsString()
  @IsOptional()
  assignTo?: string;

  @ApiProperty({
    type: Date,
    required: false,
    example: '2023-10-05',
  })
  @IsISO8601()
  @IsOptional()
  dueDate?: Date;

  @ApiProperty({
    type: String,
    example: '00:00',
    required: false,
  })
  @IsString()
  @IsOptional()
  time?: string;

  @ApiProperty({
    type: String,
    example: ETaskReminder.TODAY,
    required: false,
  })
  @IsEnum(ETaskReminder)
  @IsString()
  @IsOptional()
  reminder?: string;

  @ApiProperty({
    type: String,
    example: 'Content will display here...',
    required: false,
  })
  @IsString()
  @IsOptional()
  note?: string;

  createdById: string;
}
