import { ApiProperty } from '@nestjs/swagger';

import {
  IsBoolean,
  IsNotEmpty,
  IsString,
  IsMongoId,
  IsISO8601,
  IsEnum,
  IsOptional,
  IsNumber,
} from 'class-validator';

export class CreateAnnouncementDTO {
  @ApiProperty({ example: 'test subject', required: true })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'test subject', required: false })
  @IsString()
  @IsOptional()
  description: string;

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
    required: false,
  })
  endDate: Date;
  @ApiProperty({ example: false })
  @IsBoolean()
  @IsOptional()
  notifyMembers: boolean;
  @ApiProperty({ example: '651d72b06c9932a97b031a34' })
  @IsMongoId()
  @IsOptional()
  managedById: string;
  @ApiProperty({ example: '651d72b06c9932a97b031a34' })
  @IsMongoId()
  @IsOptional()
  vibilityId: string;
  @ApiProperty({ example: 'test email', required: false })
  @IsString()
  @IsOptional()
  additionalEmail: string;
  @ApiProperty({ example: 'test email', required: false })
  @IsString()
  @IsOptional()
  addMember: string;
}
export class AnnoucementDashboardResponseDTO {
  @ApiProperty({ example: 201 })
  statusCode: number;

  @ApiProperty({ example: 'Success' })
  message: string;

  @ApiProperty({
    example: {
      _id: '654e591571457321055d4625',
      title: 'test subject',
      description: 'test subject',
      startDate: '2023-11-10T16:22:21.839Z',
      endDate: '2023-11-10T16:22:21.839Z',
      managedById: '651d72b06c9932a97b031a34',
      vibilityId: '651d72b06c9932a97b031a34',
      notifyMembers: false,
      additionalEmail: 'test email',
      addMember: 'test email',
      createdAt: '2023-11-10T16:23:49.766Z',
      updatedAt: '2023-11-10T16:23:49.766Z',
    },
  })
  data: {};

  @ApiProperty({ example: null })
  errors: [];
}
