import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsISO8601,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class AddAssetDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    example: 'Name',
    required: true,
  })
  displayName: string;
  @IsOptional()
  @IsMongoId()
  @ApiProperty({
    example: '651bdf53beeb02bc627d6804',
  })
  assetId: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'services',
  })
  assetType: string;
  @IsNotEmpty()
  @IsEnum(['low', 'medium', 'high'])
  @ApiProperty({
    example: 'low',
    enum: ['low', 'medium', 'high'],
    required: true,
  })
  impact: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'description...',
  })
  description: string;

  @IsOptional()
  @IsISO8601()
  @ApiProperty({
    example: new Date().toISOString(),
  })
  assetLifeExpiry: string;

  @IsOptional()
  @IsMongoId()
  @ApiProperty({
    example: '651bdf53beeb02bc627d6804',
  })
  locationId: string;
  @IsOptional()
  @IsMongoId()
  @ApiProperty({
    example: '651bdf53beeb02bc627d6804',
  })
  departmentId: string;

  @IsOptional()
  @IsISO8601()
  @ApiProperty({
    example: new Date().toISOString(),
  })
  assignedOn: string;

  @IsOptional()
  @IsMongoId()
  @ApiProperty({
    example: '651bdf53beeb02bc627d6804',
  })
  usedBy: string;

  @IsOptional()
  @IsMongoId()
  @ApiProperty({
    example: '651bdf53beeb02bc627d6804',
  })
  attachmentId: string;
}
