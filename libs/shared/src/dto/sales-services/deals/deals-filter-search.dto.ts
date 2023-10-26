import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class DealFilterSearchDto {
  @ApiProperty({
    type: String,
    required: false,
    example: '6538bb480b3f9e9d83d4a2ce',
  })
  @IsOptional()
  @IsNotEmpty()
  @IsMongoId()
  dealPiplineId: string;

  @ApiProperty({
    type: String,
    required: false,
    example: 'Deal name',
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    type: String,
    required: false,
    example: '6538bb480b3f9e9d83d4a2ce',
  })
  @IsNotEmpty()
  @IsOptional()
  @IsMongoId()
  dealOwnerId: string;

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
    required: false,
    example: '6538bb480b3f9e9d83d4a2ce',
  })
  @IsOptional()
  @IsNotEmpty()
  @IsMongoId()
  dealStageId: string;

  @ApiProperty({
    type: String,
    required: false,
  })
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  search: string;
}
