import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { UserRole, UserStatus } from '../../constants/enums';

export class EditUserByAdminDto {
  @ApiProperty({
    required: false,
    example: '',
    enum: UserRole,
  })
  @IsOptional()
  role: string;

  @ApiProperty({
    required: false,
    example: '',
  })
  @IsOptional()
  firstName?: string;

  @ApiProperty({
    required: false,
    example: '',
  })
  @IsOptional()
  middleName?: string;

  @ApiProperty({
    required: false,
    example: '',
  })
  @IsOptional()
  lastName?: string;

  @ApiProperty({
    uniqueItems: true,
    required: false,
    example: '',
  })
  @IsOptional()
  email?: string;

  @ApiProperty({
    required: false,
    example: '',
  })
  @IsOptional()
  CRN?: string;

  @ApiProperty({
    required: false,
    example: '',
  })
  @IsOptional()
  phoneNumber?: string;

  @ApiProperty({
    required: false,
    example: '',
  })
  @IsOptional()
  companyName?: string;

  @ApiProperty({
    required: false,
    example: [],
  })
  @IsOptional()
  products?: string[];

  @ApiProperty({
    required: false,
    example: UserStatus.ACTIVE,
    enum: UserStatus,
  })
  @IsOptional()
  status?: string;

  userId: string;
}
