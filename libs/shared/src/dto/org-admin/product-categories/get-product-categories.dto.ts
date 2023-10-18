import { ApiProperty } from '@nestjs/swagger';
import { EStatusToggle } from '@shared/constants';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { PaginationDto } from '../../common';

export class GetProductCategoriesDto extends PaginationDto {
  @ApiProperty({
    type: String,
    required: false,
    example: 'Search By name or description',
  })
  @IsNotEmpty()
  @IsOptional()
  search: string;

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

  userId: string;
}
