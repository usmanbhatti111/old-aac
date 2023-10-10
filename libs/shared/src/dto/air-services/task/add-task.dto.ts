import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsISO8601 } from 'class-validator';

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
  @IsString()
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
  @IsString()
  @ApiProperty({
    type: String,
    example: 'Content will display here...',
    required: true,
  })
  workSpace: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    example: 'User',
    required: true,
  })
  assignTo: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    example: 'Status',
    required: true,
  })
  status: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    example: '15 Minutes',
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

  @IsNotEmpty()
  @IsISO8601()
  @ApiProperty({
    type: Date,
    required: true,
  })
  endDate: Date;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    example: '1h10m',
    required: true,
  })
  plannedEffort: string;
}
