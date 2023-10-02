import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export enum PlanTypeEnum {
  GROWTH = 'Growth',
  ENTERPRISE = 'Enterprise',
  PREMIUM = 'Premium',
}

class ProductFeature {
  @ApiProperty()
  @IsString()
  @IsOptional()
  dealsAssociationsDetail: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  feature_id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  product_id: string;
}

class ProductModule {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  module_id: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  sub_module_id: string;

  @ApiProperty({ type: String, isArray: true })
  @IsOptional()
  module_permission_id: string[];

  @ApiProperty({ type: String, isArray: true })
  @IsOptional()
  sub_module_permission_id: string[];

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  product_id: string;
}

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
    enum: PlanTypeEnum,
    enumName: 'Plan Type',
  })
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
    type: () => ProductFeature,
    isArray: true,
  })
  @Type(() => ProductFeature)
  plan_feature: ProductFeature[];

  @ApiProperty({
    type: () => ProductModule,
    isArray: true,
  })
  @Type(() => ProductModule)
  plan_module: ProductModule[];
}
