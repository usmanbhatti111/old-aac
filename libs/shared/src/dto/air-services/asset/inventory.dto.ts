import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsEnum,
  IsISO8601,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  ArrayNotEmpty,
} from 'class-validator';
import { paginationDTO } from '../../pagination/pagination.dto';
import { EMongooseDateFilter, EExportFile } from '@shared/constants';
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
  @IsMongoId()
  @ApiProperty({
    example: '651bdf53beeb02bc627d6805',
  })
  usedBy: string;

  @IsOptional()
  @IsISO8601()
  @ApiProperty({
    example: new Date().toISOString(),
  })
  assignedOn: string;
  @ApiProperty({
    type: [String],
    example: ['652ee528da86b788fd6ca7ea'],
  })
  @ArrayNotEmpty()
  attachments: string;
}
export class GetInventoryDto extends paginationDTO {
  @ApiProperty({
    enum: EMongooseDateFilter,
    example: '',
    required: false,
  })
  @IsEnum(EMongooseDateFilter)
  @IsOptional()
  createdAt: string;
  @ApiProperty({
    enum: EMongooseDateFilter,
    example: '',
    required: false,
  })
  @IsEnum(EMongooseDateFilter)
  @IsOptional()
  updatedAt: string;
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
  @IsMongoId()
  @ApiProperty({ example: '56cb91bdc3464f14678934ca', required: false })
  usedBy: string;

  @IsOptional()
  @ApiProperty({
    example: '',
    required: false,
  })
  search: string;

  @ApiProperty({
    type: String,
    required: false,
    enum: EExportFile,
  })
  @IsEnum(EExportFile)
  @IsOptional()
  exportType: string;
}
export class GetInventoryAssociateDto extends paginationDTO {
  @ApiProperty({
    type: [String],
    example: ['652ee528da86b788fd6ca7ea'],
  })
  @ArrayNotEmpty()
  attachments: string;

  @IsOptional()
  @ApiProperty({
    example: '',
    required: false,
  })
  search: string;

  @IsMongoId()
  @ApiProperty({
    required: false,
    example: '651bdf53beeb02bc627d6804',
  })
  deviceId: string; // this is actually software Id

  @ApiProperty({
    type: String,
    required: false,
    enum: EExportFile,
  })
  @IsEnum(EExportFile)
  @IsOptional()
  exportType: string;
}

export class SearchInventoryDto extends paginationDTO {
  @ApiProperty({
    type: String,
    example: 'Name',
    required: false,
  })
  displayName: string;
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

  @ApiProperty({
    type: [String],
    example: ['652ee528da86b788fd6ca7ea'],
  })
  @ArrayNotEmpty()
  attachments: string;
}
