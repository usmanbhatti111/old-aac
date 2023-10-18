import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class AddProductCategoryDto {
  @ApiProperty({
    type: String,
    required: true,
    example: 'Product Category name',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: String,
    required: false,
    example: '<h1>product Category Description</h1>',
  })
  @IsNotEmpty()
  @IsOptional()
  description: string;

  createdBy: string;
}
