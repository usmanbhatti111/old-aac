import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AddCompanyAccountRoleDto {
  @ApiProperty({ example: '56cb91bdc3464f14678934ca' })
  @IsMongoId()
  @IsNotEmpty()
  organizationId: string;

  @ApiProperty({ example: '56cb91bdc3464f14678934ca' })
  @IsMongoId()
  @IsNotEmpty()
  organizationCompanyAccountId: string;

  @ApiProperty({ example: '56cb91bdc3464f14678934ca' })
  @IsMongoId()
  @IsNotEmpty()
  productId: string;

  @ApiProperty({
    example: 'this is description of role',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    example: 'admin',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: ['add-user', 'view-dashboard', 'add-deals'] })
  @IsNotEmpty()
  permissions: [];
  @ApiProperty({
    example: 'ACTIVE',
  })
  @IsNotEmpty()
  @IsString()
  status: string;
}
