import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsMongoId } from 'class-validator';

export class AddAssetTypeDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    example: 'Title Name',
    required: true,
  })
  Name: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
    example: 'Content will display here...',
    required: false,
  })
  Description: string;

  @IsOptional()
  @IsMongoId()
  @ApiProperty({
    type: String,
    example: '651bdf53beeb02bc627d6804',
    required: false,
  })
  createdBy: string;
  @IsOptional()
  @IsMongoId()
  @ApiProperty({
    type: String,
    example: '651bdf53beeb02bc627d6804',
    required: false,
  })
  companyId: string;
}
