import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class EditProductDto {
  @ApiProperty({
    type: String,
    required: false,
    example: 'Sales',
  })
  @IsNotEmpty()
  @IsOptional()
  name: string;

  @ApiProperty({
    type: String,
    required: false,
    example: 'Manage your sales with Air Apple Cart',
  })
  @IsNotEmpty()
  @IsOptional()
  description: string;

  @ApiProperty({
    type: String,
    required: false,
    example: '6513b01ed274bd98dfacaf06',
  })
  @IsNotEmpty()
  @IsOptional()
  logo: string;

  @ApiProperty({
    type: Boolean,
    required: true,
  })
  @IsNotEmpty()
  @IsOptional()
  isActive: boolean;

  modifiedBy: string;
  id: string;
}
