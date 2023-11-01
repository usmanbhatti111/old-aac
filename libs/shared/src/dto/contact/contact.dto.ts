import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsISO8601,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class ContactDto {
  @ApiProperty({
    required: true,
    type: String,
    maxLength: 50,
    example: 'maarij.bhatti@ceative.co.uk',
  })
  @IsEmail()
  @IsOptional()
  email: string;

  @ApiProperty({
    example: 'Maarij',
    type: String,
    maxLength: 50,
  })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    example: 'Bhatti',
    type: String,
    maxLength: 50,
  })
  @IsString()
  @IsOptional()
  lastName: string;

  @ApiProperty({
    example: 'Bhatti',
    required: true,
    type: String,
    maxLength: 50,
  })
  @IsString()
  @IsOptional()
  address?: string;

  @IsISO8601()
  @ApiProperty({
    example: new Date().toISOString(),
    required: false,
  })
  @IsOptional()
  dateOfBirth?: Date;

  @ApiProperty({
    example: '00923165372970',
    maxLength: 50,
    required: false,
  })
  @IsString()
  @IsOptional()
  phoneNumber?: string;

  @ApiProperty({
    example: '00923165372970',
    maxLength: 50,
    required: false,
  })
  @IsString()
  @IsOptional()
  whatsAppNumber?: string;

  @ApiProperty({
    example: 'maarij',
    required: false,
  })
  @IsString()
  @IsOptional()
  contactOwner?: string;

  @ApiProperty({
    example: 'developer',
    type: String,
    maxLength: 50,
  })
  @IsString()
  @IsNotEmpty()
  jobTitle: string;

  @ApiProperty({
    example: 'maarij',
    required: false,
  })
  @IsString()
  @IsOptional()
  lifeCycleStage?: string;

  @ApiProperty({
    example: 'maarij',
    required: false,
  })
  @IsString()
  @IsOptional()
  status?: string;

  @IsISO8601()
  @ApiProperty({
    example: new Date().toISOString(),
    required: false,
  })
  @IsOptional()
  dateOfJoinig?: Date;
}
