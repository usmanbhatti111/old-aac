import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsEnum,
  IsISO8601,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { paginationDTO } from '../../pagination/pagination.dto';

export class AddInventoryDto {
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
  @IsOptional()
  @IsISO8601()
  createdAt: string;

  @IsNotEmpty()
  @IsString()
  @IsEnum(['services', 'hardware', 'software'])
  @ApiProperty({
    example: 'services',
    enum: ['services', 'hardware', 'software'],
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
export class GetInventoryDto extends paginationDTO {
  @ApiProperty({
    type: String,
    example: 'Name',
    required: false,
  })
  displayName: string;
  @IsOptional()
  @IsMongoId()
  @ApiProperty({
    example: '651bdf53beeb02bc627d6804',
    required: false,
  })
  assetId: string;
  @IsOptional()
  @ApiProperty({
    example: new Date().toISOString(),
    required: false,
  })
  createdAt: string;
  @IsEnum(['services', 'hardware', 'software'])
  @ApiProperty({
    example: 'services',
    enum: ['services', 'hardware', 'software'],
    required: false,
  })
  assetType: string;

  @IsEnum(['low', 'medium', 'high'])
  @ApiProperty({
    example: 'low',
    enum: ['low', 'medium', 'high'],
    required: false,
  })
  impact: string;

  @IsOptional()
  @ApiProperty({
    example: 'description...',
    required: false,
  })
  description: string;

  @IsOptional()
  @IsISO8601()
  @ApiProperty({
    example: new Date().toISOString(),
    required: false,
  })
  assetLifeExpiry: string;

  @IsOptional()
  @IsMongoId()
  @ApiProperty({
    example: '651bdf53beeb02bc627d6804',
    required: false,
  })
  locationId: string;

  @IsOptional()
  @IsMongoId()
  @ApiProperty({
    example: '651bdf53beeb02bc627d6804',
    required: false,
  })
  departmentId: string;

  @IsOptional()
  @IsISO8601()
  @ApiProperty({
    example: new Date().toISOString(),
    required: false,
  })
  assignedOn: string;

  @IsOptional()
  @IsMongoId()
  @ApiProperty({ example: '56cb91bdc3464f14678934ca', required: false })
  usedBy: string;

  @IsOptional()
  @IsMongoId()
  @ApiProperty({
    example: '651bdf53beeb02bc627d6804',
    required: false,
  })
  attachmentId: string;
  @IsOptional()
  @ApiProperty({
    example: '',
    required: false,
  })
  search: string;
}

export class EditInventoryDto {
  @IsOptional()
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
    required: false,
    example: '651bdf53beeb02bc627d6804',
  })
  assetId: string;

  @IsOptional()
  @IsISO8601()
  createdAt: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @IsEnum(['services', 'hardware', 'software'])
  @ApiProperty({
    example: 'services',
    enum: ['services', 'hardware', 'software'],
  })
  assetType: string;

  @IsOptional()
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
    required: false,
  })
  description: string;

  @IsOptional()
  @IsISO8601()
  @ApiProperty({
    example: new Date().toISOString(),
    required: false,
  })
  assetLifeExpiry: string;

  @IsOptional()
  @IsMongoId()
  @ApiProperty({
    required: false,
    example: '651bdf53beeb02bc627d6804',
  })
  locationId: string;

  @IsOptional()
  @IsMongoId()
  @ApiProperty({
    required: false,
    example: '651bdf53beeb02bc627d6804',
  })
  departmentId: string;

  @IsOptional()
  @IsISO8601()
  @ApiProperty({
    required: false,
    example: new Date().toISOString(),
  })
  assignedOn: string;

  @IsOptional()
  @IsMongoId()
  @ApiProperty({
    required: false,
    example: '651bdf53beeb02bc627d6804',
  })
  usedBy: string;

  @IsOptional()
  @IsMongoId()
  @ApiProperty({
    required: false,
    example: '651bdf53beeb02bc627d6804',
  })
  attachmentId: string;
}
