
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateOrganizationDto {

  @ApiProperty({
    example: '8C68902'
  })
  registration_number: string;

  @ApiProperty({
    example: 'Orcalo Holdings'
  })
  name: string;

  @ApiProperty({
    required: true,
    example: 'oh@gmail.com'
  })
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    required: true,
    example: '++13432121'
  })
  @IsNotEmpty()
  phone_no: string;

  @ApiProperty({
    required: true,
    example: 'Street#234 '
  })
  @IsNotEmpty()
  address: string;

  @ApiProperty({
    required: true,
    example: 'CN789'
  })
  @IsNotEmpty()
  post_code: string;

 

}

export class CreateOrganizationResponseDto {

  @ApiProperty({
    example: 200
  })
  status: number

  @ApiProperty({
    example: 'Success'
  })
  message: string

  @ApiProperty({
    type: CreateOrganizationDto,
  })
  data: CreateOrganizationDto

  @ApiProperty({
    example: ''
  })
  error: string


}