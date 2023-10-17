import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEmail,
  IsISO8601,
  IsMobilePhone,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class EditContactDto {
  @ApiProperty({
    required: true,
    type: String,
    maxLength: 50,
    example: 'maarij.bhatti@ceative.co.uk',
  })
  @IsEmail()
  email: string;

  @IsOptional()
  @IsMongoId()
  @ApiProperty({
    example: '651bdf53beeb02bc627d6804',
  })
  profilePictureId: string;

  @ApiProperty({
    example: 'Maarij',
    type: String,
    maxLength: 50,
  })
  @IsString()
  @IsOptional()
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
  @IsOptional()
  @IsString()
  address: string;

  @IsOptional()
  @IsISO8601()
  @ApiProperty({
    example: new Date().toISOString(),
  })
  dateOfBirth: Date;

  @ApiProperty({
    example: '00923165372970',
    maxLength: 50,
  })
  @IsOptional()
  @IsMobilePhone()
  phoneNumber: string;

  @ApiProperty({
    example: '00923165372970',
    maxLength: 50,
  })
  @IsMobilePhone()
  @IsOptional()
  whatsAppNumber: string;

  @IsOptional()
  @ApiProperty({
    example: 'developer',
    type: String,
    maxLength: 50,
  })
  @IsString()
  jobTitle: string;

  @IsOptional()
  @IsMongoId()
  @ApiProperty({
    example: '651bdf53beeb02bc627d6804',
  })
  contactOwnerId: string;

  @IsOptional()
  @IsMongoId()
  @ApiProperty({
    example: '651bdf53beeb02bc627d6804',
  })
  lifeCycleStageId: string;

  @IsOptional()
  @IsISO8601()
  @ApiProperty({
    example: new Date().toISOString(),
  })
  dataOfJoinig: Date;

  @IsOptional()
  @IsMongoId()
  @ApiProperty({
    example: '651bdf53beeb02bc627d6804',
  })
  statusId: string;

  createdBy?: string;

  updatedBy?: string;

  contactId: string;
}
