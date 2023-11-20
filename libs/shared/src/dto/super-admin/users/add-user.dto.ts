import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class AddUserDto {
  @ApiProperty({
    required: true,
    example: '',
  })
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    required: true,
    example: '',
  })
  @IsOptional()
  lastName: string;

  @ApiProperty({
    required: true,
    example: '',
  })
  @IsOptional()
  address: string;

  @ApiProperty({
    uniqueItems: true,
    example: 'test@example.com',
  })
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    uniqueItems: true,
    example: '',
  })
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty({
    required: true,
    example: '',
  })
  @IsNotEmpty()
  postCode: string;

  @ApiProperty({
    required: false,
    example: '',
  })
  @IsOptional()
  jobTitle: string;

  @ApiProperty({
    required: false,
    example: '',
  })
  @IsOptional()
  facebookUrl: string;

  @ApiProperty({
    required: false,
    example: '',
  })
  @IsOptional()
  linkedUrl: string;

  @ApiProperty({
    required: false,
    example: '',
  })
  @IsOptional()
  twitterUrl: string;
}
