import { ApiProperty } from '@nestjs/swagger';
import { ETaskNotifyStatus, ETicketsTaskStatus } from '@shared/constants';
import {
  IsNotEmpty,
  IsString,
  IsISO8601,
  IsOptional,
  IsMongoId,
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

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    example: 'Content will display here...',
    required: true,
  })
  description: string;

  @IsNotEmpty()
  @IsMongoId()
  @ApiProperty({
    type: String,
    example: '651bdf53beeb02bc627d6804',
    required: true,
  })
  departmentId: string;

  @IsNotEmpty()
  @IsMongoId()
  @ApiProperty({
    type: String,
    example: '651bdf53beeb02bc627d6804',
    required: true,
  })
  createdBy: string;

  @IsNotEmpty()
  @IsMongoId()
  @ApiProperty({
    type: String,
    example: '651bdf53beeb02bc627d6804',
    required: true,
  })
  assignTo: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    example: ETicketsTaskStatus.TODO,
    required: true,
  })
  status: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    example: ETaskNotifyStatus.FIVE_MINS,
    required: true,
  })
  notifyBefore: string;

  @IsNotEmpty()
  @IsISO8601()
  @ApiProperty({
    type: Date,
    required: true,
  })
  startDate: Date;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
    required: true,
  })
  startDateTime: string;

  @IsNotEmpty()
  @IsISO8601()
  @ApiProperty({
    type: Date,
    required: true,
  })
  endDate: Date;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
    required: true,
  })
  endDateTime: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    example: '1h10m',
    required: true,
  })
  plannedEffort: string;
}
