import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';

export class EditProductFeatureDto {
  @ApiProperty({ required: false, example: '56cb91bdc3464f14678934ca' })
  @IsMongoId()
  @IsNotEmpty()
  @IsOptional()
  productId: string;

  @ApiProperty({
    type: String,
    required: false,
    example: 'Create Deals',
  })
  @IsNotEmpty()
  @IsOptional()
  name: string;

  @ApiProperty({
    type: String,
    required: false,
    example: 'Create Deals Description',
  })
  @IsNotEmpty()
  @IsOptional()
  description: string;

  @ApiProperty({
    type: Boolean,
    required: false,
  })
  @IsNotEmpty()
  @IsOptional()
  isActive: boolean;

  modifiedBy: string;
  id: string;
}
