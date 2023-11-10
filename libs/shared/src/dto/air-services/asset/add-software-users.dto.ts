import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import mongoose, { SchemaTypes } from 'mongoose';

export class SoftwareUsersDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    example: '651bdf53beeb02bc627d6804',
  })
  userRefId: string;
  @ApiProperty({
    type: String,
    example: '651bdf53beeb02bc627d6804',
    required: false,
  })
  contractId: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    example: '651bdf53beeb02bc627d6804',
  })
  softwareId: string;
}
