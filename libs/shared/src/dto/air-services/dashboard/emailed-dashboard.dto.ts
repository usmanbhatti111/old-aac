import { ApiProperty } from '@nestjs/swagger';
import { FileType, IsRecurring, Schedule } from '@shared/constants';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class EmailedDashboardDTO {
  @IsEnum(IsRecurring)
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    required: true,
    enum: Object.values(IsRecurring),
  })
  isRecurring: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    example: 'test@example.com',
    required: true,
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    example: 'Test Subject',
    required: true,
  })
  subject: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    example: 'Test Message...',
    required: true,
  })
  message: string;

  @IsEnum(Schedule)
  @IsOptional()
  @ApiProperty({
    type: String,
    required: false,
    enum: Schedule,
  })
  schedule?: string;

  @IsEnum([
    '12:00 AM',
    '1:00 AM',
    '2:00 AM',
    '3:00 AM',
    '4:00 AM',
    '5:00 AM',
    '6:00 AM',
  ])
  @IsOptional()
  @ApiProperty({
    type: String,
    required: false,
    enum: [
      '12:00 AM',
      '1:00 AM',
      '2:00 AM',
      '3:00 AM',
      '4:00 AM',
      '5:00 AM',
      '6:00 AM',
    ],
  })
  time?: string;

  @IsEnum(FileType)
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    required: true,
    enum: Object.values(FileType),
  })
  fileType: string;
}

export class EmailedDashboardResponseDTO {
  @ApiProperty({ example: 201 })
  statusCode: number;

  @ApiProperty({ example: 'Success' })
  message: string;

  @ApiProperty({
    example: {
      _id: '654517b85da1827336347cce',
      isRecurring: 'YES',
      email: 'test@example.com',
      subject: 'Test Subject',
      message: 'Test Message...',
      schedule: 'Daily',
      time: '1:00 AM',
      fileType: 'PDF',
      createdAt: '2023-11-03T15:54:32.650Z',

      updatedAt: '2023-11-03T15:54:32.650Z',
    },
  })
  data: {};

  @ApiProperty({ example: null })
  errors: [];
}
