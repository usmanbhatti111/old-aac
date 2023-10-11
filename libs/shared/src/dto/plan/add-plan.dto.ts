import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ProductFeatureDto } from './product-feature.dto';
import { ProductModuleDto } from './product-module.dto';

export class AddPlanDto {
  @ApiProperty()
  @IsOptional()
  product_id: string;

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
  @IsMongoId()
  @IsNotEmpty()
  plan_type_id: string;

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
  default_users: number;

  @ApiProperty({
    required: true,
    example: 12,
  })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  default_storage: number;

  @ApiProperty({
    required: true,
    example: 12,
  })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  plan_price: number;

  @ApiProperty({
    example: 12,
  })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  additional_per_user_price: number;

  @ApiProperty({
    example: 12,
  })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  additional_storage_price: number;

  @ApiProperty({
    type: () => ProductFeatureDto,
    isArray: true,
  })
  @Type(() => ProductFeatureDto)
  plan_feature: ProductFeatureDto[];

  @ApiProperty({
    type: () => ProductModuleDto,
    isArray: true,
  })
  @Type(() => ProductModuleDto)
  plan_module: ProductModuleDto[];

  created_by: string;
}
