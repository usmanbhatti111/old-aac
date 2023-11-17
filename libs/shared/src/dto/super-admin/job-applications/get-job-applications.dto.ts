import { ApiProperty } from '@nestjs/swagger';
import { EApplicationStatus } from '@shared/constants';
import { Transform } from 'class-transformer';
import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { toMongoObjectId } from 'libs/shared/src/functions';
import { PaginationDto } from '../../common';

export class GetJobApplicationsDto extends PaginationDto {
  @ApiProperty({
    type: String,
    example: '56cb91bdc3464f14678934ca',
    required: false,
  })
  @Transform(toMongoObjectId)
  candidateId: string;

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
    enum: EApplicationStatus,
  })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  status: string;

  @ApiProperty({
    required: false,
    description: 'Search By Job Title, candidate name',
  })
  @IsString()
  @IsOptional()
  search: string;
}
