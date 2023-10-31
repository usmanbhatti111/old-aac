import { ApiProperty } from '@nestjs/swagger';
import { EExportFile } from '@shared/constants';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class GetSoftwareUserDto {
  @ApiProperty({ default: 1, required: false })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  page: number;

  @ApiProperty({ default: 10, required: false })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  limit: number;

  @ApiProperty({
    type: String,
    required: false,
  })
  search: string;
  @ApiProperty({
    type: String,
    required: false,
  })
  name: string;

  @ApiProperty({
    type: Date,
    required: false,
  })
  assignedDate: string;
  @IsEnum(EExportFile)
  @IsOptional()
  @ApiProperty({
    type: String,
    required: false,
    enum: EExportFile,
  })
  exportType: string;
}
