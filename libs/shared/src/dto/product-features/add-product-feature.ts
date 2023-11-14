import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional } from 'class-validator';

export class AddProductFeatureDto {
  @ApiProperty({
    type: [String],
    isArray: true,
    example: ['56cb91bdc3464f14678934ca', '56cb91bdc3464f14678934ca'],
    required: true,
  })
  @IsNotEmpty()
  @IsArray()
  productIds: string[];

  @ApiProperty({
    type: String,
    required: true,
    example: 'Create Deals',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: String,
    required: false,
    example: 'Create Deals Description',
  })
  @IsNotEmpty()
  @IsOptional()
  description: string;

  createdBy: string;
}
