import { ApiProperty } from '@nestjs/swagger';
import { ETaskNotifyStatus, ETicketsTaskStatus } from '@shared/constants';
import {
  IsNotEmpty,
  IsString,
  IsISO8601,
  IsOptional,
  IsMongoId,
  IsEnum,
} from 'class-validator';

export class AddTaskDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    example: 'Title Name',
    required: true,
  })
  title: string;

  @IsNotEmpty()
  @IsMongoId()
  @ApiProperty({
    type: String,
    example: '651bdf53beeb02bc627d6804',
    required: true,
  })
  ticketId: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
    example: 'Content will display here...',
    required: false,
  })
  description?: string;

  @IsNotEmpty()
  @IsMongoId()
  @ApiProperty({
    type: String,
    example: '651bdf53beeb02bc627d6804',
    required: true,
  })
  departmentId: string;

  @IsOptional()
  @IsMongoId()
  @ApiProperty({
    type: String,
    example: '651bdf53beeb02bc627d6804',
    required: false,
  })
  createdBy?: string;

  @IsOptional()
  @IsMongoId()
  @ApiProperty({
    type: String,
    example: '651bdf53beeb02bc627d6804',
    required: false,
  })
  assignTo?: string;

  @IsOptional()
  @IsEnum(ETicketsTaskStatus)
  @ApiProperty({
    enum: ETicketsTaskStatus,
    required: false,
  })
  status?: string;

  @IsOptional()
  @IsEnum(ETaskNotifyStatus)
  @ApiProperty({
    enum: ETaskNotifyStatus,
    required: false,
  })
  notifyBefore?: string;

  @IsOptional()
  @IsISO8601()
  @ApiProperty({
    type: Date,
    required: false,
  })
  startDate?: Date;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
    required: false,
  })
  startDateTime?: string;

  @IsOptional()
  @IsISO8601()
  @ApiProperty({
    type: Date,
    required: false,
  })
  endDate?: Date;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
    required: false,
  })
  endDateTime?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
    example: '1h10m',
    required: false,
  })
  plannedEffort?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
    example: 'This is for comment section..',
    required: false,
  })
  comments?: string;
}

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
    example: 'Title Name',
    required: false,
  })
  title: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
    example: 'Content will display here...',
    required: false,
  })
  description?: string;

  @IsOptional()
  @IsMongoId()
  @ApiProperty({
    type: String,
    example: '651bdf53beeb02bc627d6804',
    required: false,
  })
  departmentId: string;

  @IsOptional()
  @IsMongoId()
  @ApiProperty({
    type: String,
    example: '651bdf53beeb02bc627d6804',
    required: false,
  })
  createdBy?: string;

  @IsOptional()
  @IsMongoId()
  @ApiProperty({
    type: String,
    example: '651bdf53beeb02bc627d6804',
    required: false,
  })
  assignTo?: string;

  @IsOptional()
  @IsEnum(ETicketsTaskStatus)
  @ApiProperty({
    enum: ETicketsTaskStatus,
    required: false,
  })
  status?: string;

  @IsOptional()
  @IsEnum(ETaskNotifyStatus)
  @ApiProperty({
    enum: ETaskNotifyStatus,
    required: false,
  })
  notifyBefore?: string;

  @IsOptional()
  @IsISO8601()
  @ApiProperty({
    type: Date,
    required: false,
  })
  startDate?: Date;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
    required: false,
  })
  startDateTime?: string;

  @IsOptional()
  @IsISO8601()
  @ApiProperty({
    type: Date,
    required: false,
  })
  endDate?: Date;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
    required: false,
  })
  endDateTime?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
    example: '1h10m',
    required: false,
  })
  plannedEffort?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
    example: 'This is for comment section..',
    required: false,
  })
  comments?: string;
}
