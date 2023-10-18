import { ApiProperty } from '@nestjs/swagger';
import { EStatusToggle } from '@shared/constants';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class EditProductCategoryDto {
  @ApiProperty({
    type: String,
    required: false,
    example: 'Product Category name',
  })
  @IsNotEmpty()
  @IsOptional()
  name: string;

  @ApiProperty({
    type: String,
    required: false,
    example: '<h1>product Category Description</h1>',
  })
  @IsNotEmpty()
  @IsOptional()
  description: string;

  @ApiProperty({
    type: String,
    required: false,
    enum: EStatusToggle,
    example: EStatusToggle.ACTIVE,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  status: string;

  updatedBy: string;
  id: string;
}
