import { ApiProperty } from '@nestjs/swagger';
import { Faq } from '@shared/schemas';
import {
  IsOptional,
  IsDateString,
  IsString,
  IsBoolean,
  IsNumber,
  IsEnum,
} from 'class-validator';
import { EMongooseDateFilter } from '@shared/constants';
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
  //TODO NEDD THESE KEYS
}
