import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsISO8601,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import {
  EJobCategories,
  EJobStatus,
  PermissionStatus,
} from '../../constants/enums';
import { PaginationDto } from '../common';
import { toMongoObjectId } from '../../functions';
import { Transform } from 'class-transformer';

export class GetCompanyAccountRolesDto extends PaginationDto {
  @ApiProperty({
    required: false,
    example: '5f8b14d073bce3c5f404f78r',
  })
  @IsOptional()
  @Transform(toMongoObjectId, { toClassOnly: true })
  organizationCompanyAccountId: string;

  @ApiProperty({
    required: false,
    example: '5f8b14d073bce3c5f404f78r',
  })
  @IsOptional()
  @Transform(toMongoObjectId, { toClassOnly: true })
  productId: string;

  @ApiProperty({
    required: false,
    example: '2023-10-02',
  })
  @IsOptional()
  @IsDateString()
  dateStart: string;

  @ApiProperty({
    required: false,
    example: '2023-10-03',
  })
  @IsOptional()
  @IsDateString()
  dateEnd: string;

  @ApiProperty({
    enum: PermissionStatus,
    required: false,
  })
  @IsOptional()
  @IsString()
  status: string;

  @ApiProperty({
    example: 'admin',
    required: false,
  })
  @IsOptional()
  @IsString()
  search: string;
}
