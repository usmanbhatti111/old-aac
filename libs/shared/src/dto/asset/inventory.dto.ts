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
  display_name: string;
  @IsOptional()
  @IsMongoId()
  @ApiProperty({
    example: '651bdf53beeb02bc627d6804',
  })
  asset_id: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'services',
  })
  asset_type: string;
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
  asset_life_expiry: string;

  @IsOptional()
  @IsMongoId()
  @ApiProperty({
    example: '651bdf53beeb02bc627d6804',
  })
  location_id: string;
  @IsOptional()
  @IsMongoId()
  @ApiProperty({
    example: '651bdf53beeb02bc627d6804',
  })
  department_id: string;

  @IsOptional()
  @IsISO8601()
  @ApiProperty({
    example: new Date().toISOString(),
  })
  assigned_on: string;

  @IsOptional()
  @IsMongoId()
  @ApiProperty({
    example: '651bdf53beeb02bc627d6804',
  })
  used_by: string;

  @IsOptional()
  @IsMongoId()
  @ApiProperty({
    example: '651bdf53beeb02bc627d6804',
  })
  attachment_id: string;
}
