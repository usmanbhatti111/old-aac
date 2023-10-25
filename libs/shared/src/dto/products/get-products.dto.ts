import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { EStatusToggle } from '../../constants/enums';

export class GetProductsDto {
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
}
