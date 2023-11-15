import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsISO8601,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { paginationDTO } from '../pagination/pagination.dto';
import {
  EFaqCategories,
  EJobCategories,
  EJobStatus,
} from '../../constants/enums';
import { toMongoObjectId } from '../../functions';
import { Transform } from 'class-transformer';

export class GetFaqsDto extends paginationDTO {
  @ApiProperty({
    enum: EFaqCategories,
    required: false,
  })
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  faqCategory: string;

  @ApiProperty({
    required: false,
    example: '5f8b14d073bce3c5f404f78c',
  })
  @IsOptional()
  @Transform(toMongoObjectId)
  createdBy: string;

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
    example: 'what is reactjs',
    required: false,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  search: string;
}
