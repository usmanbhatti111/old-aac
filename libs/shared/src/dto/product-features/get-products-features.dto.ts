import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';
import { PaginationDto } from '../common';

export class GetProductsFeaturesDto extends PaginationDto {
  @ApiProperty({
    type: String,
    required: false,
    example: 'Create Deals Description',
  })
  @IsNotEmpty()
  @IsOptional()
  search: string;

  @ApiProperty({ example: '56cb91bdc3464f14678934ca', required: false })
  @IsMongoId()
  @IsNotEmpty()
  @IsOptional()
  productId: string;
}
