import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '@shared/constants';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsEmail,
  IsEnum,
} from 'class-validator';

export class AddRequesterDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    example: 'First Name',
    required: true,
  })
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    example: 'Last Name',
    required: true,
  })
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    type: String,
    example: 'user_req@example.com',
    required: true,
  })
  email: string;

  @IsOptional()
  @IsEnum(UserRole)
  @ApiProperty({
    enum: UserRole,
    example: UserRole?.ORG_REQUESTER,
    required: false,
  })
  role?: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    example: 'Job Title',
    required: true,
  })
  jobTitle: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
    example: '+4423882399',
    required: false,
  })
  phoneNumber: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
    example: '(GMT = 04:00) Perth',
    required: false,
  })
  timezone: string;
}

export class AddRequesterResponseDTO {
  @ApiProperty({ example: 201 })
  statusCode: number;

  @ApiProperty({ example: 'Success' })
  message: string;

  @ApiProperty({
    example: {
      _id: '6564b949c59bd12969697596',
      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'user_req1@yopmail.com',
      phoneNumber: '+4423882399',
      jobTitle: 'Job Title',
      role: 'ORG_REQUESTER',
      status: 'INACTIVE',
      products: [],
      timezone: '(GMT = 04:00) Perth',
      company: '6555e426560f7182109578c1',
      createdBy: '6555e426560f7182109578c1',
      createdAt: '2023-11-27T15:44:09.233Z',
      updatedAt: '2023-11-27T15:44:09.233Z',
    },
  })
  data: {};

  @ApiProperty({ example: null })
  errors: [];
}
