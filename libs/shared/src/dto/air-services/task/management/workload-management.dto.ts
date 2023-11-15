import { ApiProperty } from '@nestjs/swagger';
import { Faq } from '@shared/schemas';
import {
  IsOptional,
  IsDateString,
  IsString,
  IsBoolean,
  IsNumber,
  IsEnum,
  IsArray,
  IsMongoId,
} from 'class-validator';
import { EMongooseDateFilter } from '@shared/constants';
import { EManageWorloadStatus } from '@shared/constants';
export class WorkLoadFilterDto {
  @ApiProperty({
    example: '2023-10-30T10:02:26.877+00:00',
    required: false,
  })
  @IsOptional()
  startDate: string;
  @ApiProperty({
    example: true,
    required: false,
  })
  @IsOptional()
  countDayWise: boolean;
  @ApiProperty({
    example: true,
    required: false,
  })
  @IsOptional()
  countDayWiseHours: boolean;
  @ApiProperty({
    example: true,
    required: false,
  })
  @IsOptional()
  countDayWiseHoursAverage: boolean;
  @ApiProperty({
    type: String,
    enum: EManageWorloadStatus,
    example: '',
    required: false,
  })
  @IsEnum(EManageWorloadStatus)
  @IsOptional()
  manage: string;
}

export class UserTasksDto {
  @ApiProperty({
    type: [String],
    required: false,
  })
  userIds: string[];
}
