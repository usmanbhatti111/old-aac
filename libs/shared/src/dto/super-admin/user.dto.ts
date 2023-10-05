import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class AddUserDto {
  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    required: true,
    example: 'Doe',
  })
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    uniqueItems: true,
    example: 'test@example.com',
  })
  @IsNotEmpty()
  email: string;
}

export class GetUserDto {
  @ApiProperty({
    type: String,
    required: false,
  })
  @IsOptional()
  product: string;

  @ApiProperty({
    type: String,
    required: false,
  })
  @IsOptional()
  company: string;

  @ApiProperty({
    type: String,
    required: false,
  })
  @IsOptional()
  users: string;
}

export class UpdateUserDto {
  @ApiProperty({
    required: true,
    example: 'Jon',
  })
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    required: true,
    example: 'Doe',
  })
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    required: false,
    uniqueItems: true,
    example: 'test@example.com',
  })
  @IsNotEmpty()
  @IsOptional()
  email: string;
}
