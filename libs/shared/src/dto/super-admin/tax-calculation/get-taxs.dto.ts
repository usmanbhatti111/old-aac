import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { PaginationDto } from '../../common';
import { EStatusToggle, ETaxApplyOn } from '@shared/constants';

export class GetTaxsDto extends PaginationDto {
  @ApiProperty({
    enum: EStatusToggle,
    required: false,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  status: string;

  @ApiProperty({
    required: false,
    description: '2023-10-02',
  })
  @IsNotEmpty()
  @IsOptional()
  @IsDateString()
  dateStart: string;

  @ApiProperty({
    required: false,
    description: '2023-10-03',
  })
  @IsNotEmpty()
  @IsOptional()
  @IsDateString()
  dateEnd: string;

  @ApiProperty({
    enum: ETaxApplyOn,
    required: false,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  applyOn: string;

  @ApiProperty({
    description: 'search tax by name or description',
    required: false,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  search: string;
}
