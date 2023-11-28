import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsObject, IsString } from 'class-validator';

export class AddVendorDTO {
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
