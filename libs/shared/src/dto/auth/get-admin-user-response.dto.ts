import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { paginationDTO } from '../pagination/pagination.dto';

// userType organizationName product createAt
export class AdminUserGetResponseDto extends paginationDTO {
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
    example: '',
  })
  @IsOptional()
  organization: string;

  @ApiProperty({
    type: String,
    required: false,
    example: '',
  })
  @IsOptional()
  role: string;

  @ApiProperty({
    example: '',
    required: false,
  })
  @IsOptional()
  search: string;
}
