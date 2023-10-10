import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ENewsAndEventsTypes, EStatusToggle } from '@shared/constants';
import { PaginationDto } from '@shared/dto';

export class GetNewsOrEventsDto extends PaginationDto {
  @ApiProperty({
    type: String,
    required: false,
    example: EStatusToggle.ACTIVE,
    enum: EStatusToggle,
  })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  status: string;

  @ApiProperty({
    required: false,
    example: '2023-10-02',
  })
  @IsNotEmpty()
  @IsOptional()
  @IsDateString()
  dateStart: string;

  @ApiProperty({
    required: false,
    example: '2023-10-03',
  })
  @IsNotEmpty()
  @IsOptional()
  @IsDateString()
  dateEnd: string;

  @ApiProperty({
    type: String,
    required: false,
    example: ENewsAndEventsTypes.NEWS,
    enum: ENewsAndEventsTypes,
  })
  @IsString()
  @IsOptional()
  type: string;

  @ApiProperty({
    required: false,
    example: 'Twitter Logo',
    description: 'Search By name, type, status, description',
  })
  @IsString()
  @IsOptional()
  search: string;
}
