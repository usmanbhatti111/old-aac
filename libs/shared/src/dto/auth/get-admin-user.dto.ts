import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';
import { UserRole } from '../../constants/enums';
import { toMongoObjectId } from '../../functions';
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

export class GetOrgUsersDropDownDto {
  @IsString()
  search: string;

  @Transform(toMongoObjectId)
  organization: string;
}
