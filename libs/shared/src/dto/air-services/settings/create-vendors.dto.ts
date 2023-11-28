import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsObject, IsString } from 'class-validator';

export class AddVendorRequestDTO {
  @ApiProperty({
    type: String,
    example: 'john',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: String,
    required: true,
    example: 'john',
  })
  @IsString()
  @IsNotEmpty()
  contactName: string;

  @ApiProperty({
    type: String,
    required: true,
    example: '123456789',
  })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({
    type: String,
    required: false,
    example: '123456789',
  })
  @IsString()
  @IsNotEmpty()
  mobile: string;

  @ApiProperty({
    type: String,
    required: true,
    example: 'abc@yopmail.com',
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    type: String,
    required: false,
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    type: String,
    required: false,
  })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({
    type: String,
    required: true,
    example: 'pakistan',
  })
  @IsString()
  @IsNotEmpty()
  country: string;

  @ApiProperty({
    type: String,
    required: false,
    example: 'pk',
  })
  @IsString()
  @IsNotEmpty()
  state: string;

  @ApiProperty({
    type: String,
    required: true,
    example: 'islamabad',
  })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({
    type: String,
    required: true,
    example: '47000',
  })
  @IsString()
  @IsNotEmpty()
  zipCode: string;

  companyId: string;
}

export class AddVendorResponseDto {
  @ApiProperty({ example: 201, description: 'HTTP status code' })
  statusCode: number;

  @ApiProperty({ example: 'Success', description: 'Response message' })
  message: string;

  @ApiProperty({
    example: {
      _id: '656659b1555a923c5709bd4e',
      name: 'john',
      contactName: 'john',
      phone: '123456789',
      mobile: '123456789',
      email: 'abc@yopmail.com',
      description: 'string',
      address: 'string',
      country: 'pakistan',
      state: 'pk',
      city: 'islamabad',
      zipCode: '47000',
      createdAt: '2023-11-28T21:20:49.260Z',
      updatedAt: '2023-11-28T21:20:49.260Z',
    },
    description: 'Response data object',
  })
  data: {};

  @ApiProperty({ example: null, description: 'Error details (if any)' })
  error: null | string;
}
