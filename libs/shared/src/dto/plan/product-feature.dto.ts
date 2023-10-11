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
  featureId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  productId: string;
}
