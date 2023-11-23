import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UpdateUserDto {
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
  lastName?: string;

  @ApiProperty({
    required: false,
    example: '',
  })
  @IsOptional()
  address?: string;

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
  phoneNumber?: string;

  @ApiProperty({
    required: false,
    example: '',
  })
  @IsOptional()
  postCode?: string;

  @ApiProperty({
    required: false,
    example: '',
  })
  @IsOptional()
  jobTitle?: string;

  @ApiProperty({
    required: false,
    example: '',
  })
  @IsOptional()
  facebookUrl?: string;

  @ApiProperty({
    required: false,
    example: '',
  })
  @IsOptional()
  twitterUrl?: string;
}
