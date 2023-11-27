import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsMongoId } from 'class-validator';
import { PaginationDto } from '../../common';
export class ListAssetTypeDto extends PaginationDto {
  @ApiProperty({
    example: '',
    required: false,
  })
  @IsOptional()
  search: string;
  @IsOptional()
  @IsMongoId()
  @ApiProperty({
    type: String,
    example: '651bdf53beeb02bc627d6804',
    required: false,
  })
  companyId: string;
}
