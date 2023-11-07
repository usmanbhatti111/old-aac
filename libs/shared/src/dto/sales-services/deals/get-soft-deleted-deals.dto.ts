import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { PaginationDto } from '../../common';
import { Transform } from 'class-transformer';
import { toMongoObjectId } from 'libs/shared/src/functions';

export class GetSoftDeletedDealsDto extends PaginationDto {
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
    description: 'search by deal name, user name',
  })
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  search: string;

  @Transform(toMongoObjectId)
  deletedBy: string;
}
