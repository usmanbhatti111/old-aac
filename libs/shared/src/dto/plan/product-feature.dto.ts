import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ProductFeatureDto {
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
