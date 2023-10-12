import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class GetUserDto {
  @ApiProperty({
    type: String,
    required: false,
    example: '6524d3ae6f15299414a47bea',
  })
  @IsOptional()
  products: string;

  @ApiProperty({
    type: String,
    required: false,
    example: '6524d3aa6f15299414a47be8',
  })
  @IsOptional()
  company: string;

  @ApiProperty({
    type: String,
    required: false,
    example: '6524d3aa6f15299414a47be8',
  })
  @IsOptional()
  _id: string;

  @ApiProperty({
    example: '',
    required: false,
  })
  @IsOptional()
  search: string;
}
