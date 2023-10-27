import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsDateString,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { toMongoObjectId } from 'libs/shared/src/functions';

export class DealFilterSearchDto {
  @ApiProperty({
    type: String,
    required: false,
    example: '6538bb480b3f9e9d83d4a2ce',
  })
  @IsOptional()
  @IsNotEmpty()
  @Transform(toMongoObjectId)
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
  @Transform(toMongoObjectId)
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
  @Transform(toMongoObjectId)
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
