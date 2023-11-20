import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { UserRole } from '../../constants/enums';
import { paginationDTO } from '../pagination/pagination.dto';

export class GetAdminUserDto extends paginationDTO {
  @ApiProperty({
    type: String,
    required: false,
    example: '',
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
  role: UserRole;

  @ApiProperty({
    example: '',
    required: false,
  })
  @IsOptional()
  search: string;
}
