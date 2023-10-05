import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { UserAccountStatus, UserRole } from '../../constants/enums';
export class AddAccountDto {
  @ApiProperty({
    required: true,
    example: '',
  })
  @IsNotEmpty()
  product: string;

  @ApiProperty({
    required: true,
    example: '',
  })
  @IsNotEmpty()
  compay: string;

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
