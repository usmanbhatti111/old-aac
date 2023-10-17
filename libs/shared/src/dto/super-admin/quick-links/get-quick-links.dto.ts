import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { PaginationDto } from '../../common';

export class GetQuickLinksDto extends PaginationDto {
  @ApiProperty({
    required: false,
    example: '2023-05-11',
  })
  @IsNotEmpty()
  @IsOptional()
  @IsDateString()
  dateStart: string;

  @ApiProperty({
    required: false,
    example: '2023-05-11',
  })
  @IsNotEmpty()
  @IsOptional()
  @IsDateString()
  dateEnd: string;

  @ApiProperty({
    type: String,
    example: '56cb91bdc3464f14678934ca',
    required: false,
  })
  @IsMongoId()
  @IsOptional()
  @IsNotEmpty()
  productId: string;

  @ApiProperty({
    required: false,
    example: 'Sales',
    description: 'Search By product Name',
  })
  @IsString()
  @IsOptional()
  search: string;

  @ApiProperty({
    type: Boolean,
    required: false,
    example: false,
  })
  @IsOptional()
  isActive: boolean;
}
