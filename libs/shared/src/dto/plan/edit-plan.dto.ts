import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ProductFeatureDto } from './product-feature.dto';
import { ProductModuleDto } from './product-module.dto';
import { toMongoObjectId } from '../../functions';

export class EditPlanDto {
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
  })
  @Transform(toMongoObjectId, { toClassOnly: true })
  @IsOptional()
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
  @IsOptional()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  defaultUsers: number;

  @ApiProperty({
    required: true,
    example: 12,
  })
  @IsOptional()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  defaultStorage: number;

  @ApiProperty({
    required: true,
    example: 12,
  })
  @IsOptional()
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
    type: () => ProductModuleDto,
    isArray: true,
  })
  @Type(() => ProductModuleDto)
  planModule: ProductModuleDto[];

  planId: string;

  updatedBy?: string;
}
