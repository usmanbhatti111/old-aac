import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';

export class AddProductFeatureDto {
  @ApiProperty({ example: '56cb91bdc3464f14678934ca' })
  @IsMongoId()
  @IsNotEmpty()
  productId: string;

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
