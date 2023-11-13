import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class EditCompanyAccountRoleDto {
  @ApiProperty({ example: '56cb91bdc3464f14678934ca' })
  @IsNotEmpty()
  companyAccountRoleId: string;

  @ApiProperty({ example: '56cb91bdc3464f14678934ca' })
  @IsOptional()
  productId: string;

  @ApiProperty({
    example: 'this is description of role',
  })
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty({
    example: 'admin',
  })
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @ApiProperty({ example: ['add-user', 'view-dashboard', 'add-deals'] })
  permissions: [];

  @ApiProperty({
    example: 'ACTIVE',
  })
  @IsOptional()
  @IsString()
  status: string;
}
