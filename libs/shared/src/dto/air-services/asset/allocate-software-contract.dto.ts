import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import mongoose, { SchemaTypes } from 'mongoose';

export class AllocateSoftwareContractDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    example: '651bdf53beeb02bc627d6804',
  })
  id: string;
  @ApiProperty({
    type: String,
    example: '651bdf53beeb02bc627d6804',
  })
  contractId: string;
}
