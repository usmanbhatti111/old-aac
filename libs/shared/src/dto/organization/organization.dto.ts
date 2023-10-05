import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export interface IOrganization {
  logo_url?: string;
  registration_number?: string;
  name: string;
  email: string;
  phone_no: string;
  address: string;
  post_code: string;
  created_at: Date;
  updated_at?: Date;
  deleted_at?: Date;
}
export class CreateOrganizationDto {
  @ApiProperty({
    example: '8C68902',
  })
  registration_number: string;

  @ApiProperty({
    example: 'Orcalo Holdings',
  })
  name: string;

  @ApiProperty({
    required: true,
    example: 'oh@gmail.com',
  })
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    required: true,
    example: '++13432121',
  })
  @IsNotEmpty()
  phone_no: string;

  @ApiProperty({
    required: true,
    example: 'Street#234 ',
  })
  @IsNotEmpty()
  address: string;

  @ApiProperty({
    required: true,
    example: 'CN789',
  })
  @IsNotEmpty()
  post_code: string;
}

export class OrganizationDto {
  @ApiProperty({
    example: '168927646',
    description: 'The unique identifier for the organization.',
  })
  readonly id: string;

  @ApiProperty({
    example: '8C68902',
  })
  registration_number: string;

  @ApiProperty({
    example: 'Orcalo Holdings',
  })
  name: string;

  @ApiProperty({
    required: true,
    example: 'oh@gmail.com',
  })
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    required: true,
    example: '++13432121',
  })
  @IsNotEmpty()
  phone_no: string;

  @ApiProperty({
    required: true,
    example: 'Street#234 ',
  })
  @IsNotEmpty()
  address: string;

  @ApiProperty({
    required: true,
    example: 'CN789',
  })
  @IsNotEmpty()
  post_code: string;
}

export class OrganizationResponseDto {
  @ApiProperty({
    example: 200,
  })
  status: number;

  @ApiProperty({
    example: 'Success',
  })
  message: string;

  @ApiProperty({
    type: OrganizationDto,
  })
  data: OrganizationDto;

  @ApiProperty({
    example: '',
  })
  error: string;
}
