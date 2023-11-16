import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';
import { PaginationDto } from '../common';
import { toMongoObjectId } from '../../functions';
import { Transform } from 'class-transformer';

export class GetProductsFeaturesDto extends PaginationDto {
  @ApiProperty({
    type: String,
    required: false,
    description: 'search by name, description or productName',
  })
  @IsNotEmpty()
  @IsOptional()
  search: string;

  @ApiProperty({ example: '56cb91bdc3464f14678934ca', required: false })
  @Transform(toMongoObjectId)
  @IsNotEmpty()
  @IsOptional()
  productId: string;
}
