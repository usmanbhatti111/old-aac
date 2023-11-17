import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ProductFeatureDto } from './product-feature.dto';
import { ProductPermissionDto } from './product-permission.dto';
import { toMongoObjectId } from '../../functions';

export class AddPlanDto {
  @ApiProperty()
  @IsOptional()
  @Transform(toMongoObjectId, { toClassOnly: true })
  productId: string;

  @ApiProperty({
    type: String,
    isArray: true,
  })
  @IsOptional()
  suite: string[];

  @ApiProperty({
    required: true,
    type: String,
  })
  @Transform(toMongoObjectId, { toClassOnly: true })
  @IsNotEmpty()
  planTypeId: string;

  @ApiProperty({
    example: 'some description',
  })
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty({
    required: true,
    example: 12,
    type: Number,
  })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  defaultUsers: number;

  @ApiProperty({
    required: true,
    example: 12,
  })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  defaultStorage: number;

  @ApiProperty({
    required: true,
    example: 12,
  })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  planPrice: number;

  @ApiProperty({
    example: 12,
  })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  additionalPerUserPrice: number;

  @ApiProperty({
    example: 12,
  })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  additionalStoragePrice: number;

  @ApiProperty({
    type: () => ProductFeatureDto,
    isArray: true,
  })
  @Type(() => ProductFeatureDto)
  planFeature: ProductFeatureDto[];

  @ApiProperty({
    type: () => ProductPermissionDto,
    isArray: true,
  })
  @Type(() => ProductPermissionDto)
  planPermission: ProductPermissionDto[];

  createdBy: string;
}
