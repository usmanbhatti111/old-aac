import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { CompanyType, EIsDeletedStatus } from '../../../constants/enums';
import { Transform } from 'class-transformer';
import { toMongoObjectId } from 'libs/shared/src/functions';

export class CreateComapanyDTO {
  @ApiProperty({
    type: String,
    required: true,
    example: 'domain.com',
  })
  @IsString()
  @IsNotEmpty()
  domain: string;

  @ApiProperty({
    type: String,
    required: false,
    example: 'name',
  })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({
    type: String,
    example: '655633c2d9d816a1a1cfbeb2',
    required: true,
  })
  @Transform(toMongoObjectId)
  @IsNotEmpty()
  ownerId: string;

  @ApiProperty({
    type: String,
    required: false,
    example: 'industry',
  })
  @IsString()
  @IsOptional()
  industry: string;

  @ApiProperty({
    type: String,
    required: false,
    example: CompanyType.PARTNER,
    enum: CompanyType,
  })
  @IsEnum(CompanyType)
  @IsNotEmpty()
  type: string;

  @ApiProperty({
    type: Number,
    required: false,
    example: 5,
  })
  @IsNumber()
  @IsOptional()
  noOfEmloyee: number;

  @ApiProperty({
    type: Number,
    required: false,
    example: 411,
  })
  @IsNumber()
  @IsOptional()
  totalRevenue: number;

  @ApiProperty({
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  city: string;

  @ApiProperty({
    type: String,
    required: false,
    example: '1234',
  })
  @IsString()
  @IsOptional()
  postalCode: string;

  @ApiProperty({
    type: String,
    required: false,
    example: 'address',
  })
  @IsString()
  @IsOptional()
  address: string;

  @ApiProperty({
    type: String,
    required: false,
    example: 'description',
  })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({
    type: String,
    required: false,
    example: 'linkedInUrl',
  })
  @IsString()
  @IsNotEmpty()
  linkedInUrl: string;

  createdBy: string;
}

export class UpdateComapanyDto {
  @ApiProperty({
    type: String,
    required: false,
    example: '',
  })
  @IsString()
  @IsOptional()
  domain?: string;

  @ApiProperty({
    type: String,
    required: false,
    example: '',
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    type: String,
    example: '655633c2d9d816a1a1cfbeb2',
    required: false,
  })
  @Transform(toMongoObjectId)
  @IsOptional()
  ownerId: string;

  // isDeleted
  @ApiProperty({
    type: String,
    required: false,
    example: EIsDeletedStatus.ACTIVE,
    enum: EIsDeletedStatus,
  })
  @IsEnum(EIsDeletedStatus)
  @IsNotEmpty()
  isDeleted?: string;

  updatedBy: string;

  id: string;

  data: Object;
}
