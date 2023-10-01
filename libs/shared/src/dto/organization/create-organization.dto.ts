
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateOrganizationDto {

  @ApiProperty({
    example: '8C68902'
  })
  registration_number: string;

  @ApiProperty({
    type: String,
    required: true, 
    example: 'Orcalo Holdings'
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: String,
    required: true,
    example: 'oh@gmail.com'
  })
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    type: String,
    required: true,
    example: '++13432121'
  })
  @IsNotEmpty()
  phone_no: string;

  @ApiProperty({
    type: String,
    required: true,
    example: 'Street#234 '
  })
  @IsNotEmpty()
  address: string;

  @ApiProperty({
    type: String,
    required: true,
    example: 'CN789'
  })
  @IsNotEmpty()
  post_code: string;

 

}