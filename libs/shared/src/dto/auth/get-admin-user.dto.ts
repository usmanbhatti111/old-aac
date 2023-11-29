import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import {
  EMongooseDateFilter,
  UserRole,
  UserStatus,
} from '../../constants/enums';
import { toMongoObjectId } from '../../functions';
import { PaginationDto } from '../common';
import { paginationDTO } from '../pagination/pagination.dto';

export class GetAdminUserDto extends paginationDTO {
  @ApiProperty({
    type: String,
    required: false,
  })
  @IsOptional()
  @Transform(toMongoObjectId)
  products: string;

  @ApiProperty({
    type: String,
    required: false,
  })
  @IsOptional()
  @Transform(toMongoObjectId)
  organization: string;

  @ApiProperty({
    required: false,
    enum: UserRole,
    default: UserRole.ORG_ADMIN,
  })
  @IsNotEmpty()
  role: UserRole;

  @ApiProperty({
    required: false,
    enum: [UserStatus.ACTIVE, UserStatus.INACTIVE],
  })
  @IsOptional()
  @IsEnum([UserStatus.ACTIVE, UserStatus.INACTIVE])
  status: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  search: string;

  @ApiProperty({
    required: false,
    description: 'Example: 2023-11-15',
  })
  @IsOptional()
  @IsDateString()
  createdAt: string;
}

export class GetOrgUsersDropDownDto extends PaginationDto {
  @IsString()
  @IsOptional()
  search: string;

  @Transform(toMongoObjectId)
  organization?: string;
}
