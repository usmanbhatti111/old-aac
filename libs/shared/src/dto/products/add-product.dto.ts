import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class AddProductDto {
  @ApiProperty({
    type: String,
    required: true,
    example: 'Sales',
  })
  @IsNotEmpty()
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

  modifiedBy: string;
}
