import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export interface IOrganization {
  logoUrl?: string;
  registrationNumber?: string;
  name: string;
  email: string;
  phoneNo: string;
  address: string;
  postCode: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
export class CreateOrganizationDto {
  @ApiProperty({
    example: '8C68902',
  })
  registrationNumber: string;

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
  phoneNo: string;

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
  postCode: string;

  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
export class UpdateOrganizationDto extends CreateOrganizationDto {
  id?:string
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
  registrationNumber: string;

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
  phoneNo: string;

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
  postCode: string;
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

export class GetOrganizationDto {
  @ApiProperty({
    example: '651e6368a3a6baf2f193efb0',
  })
  @IsMongoId()
  @IsNotEmpty()
  id: string;
}
