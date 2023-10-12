import { ApiProperty } from '@nestjs/swagger';
import { UserAccountStatus, UserRole } from '@shared/constants';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class AddAccountDto {
  @ApiProperty({
    required: true,
    example: '65237e5b4a426328bd15f439',
  })
  @IsNotEmpty()
  products: string;

  @ApiProperty({
    required: true,
    example: '65237e5b4a426328bd15f439',
  })
  @IsNotEmpty()
  @IsMongoId()
  company: string;

  @ApiProperty({
    required: true,
    example: UserRole.ORG_ADMIN,
  })
  @IsNotEmpty()
  manageRole: string;

  @ApiProperty({
    required: true,
    example: UserAccountStatus.INACTIVE,
  })
  @IsNotEmpty()
  status: string;
}
