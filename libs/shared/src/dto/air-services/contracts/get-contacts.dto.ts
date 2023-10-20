import { ApiProperty } from '@nestjs/swagger';
import {
  EContractExpiry,
  EContractStatus,
  EExportFile,
} from '@shared/constants';
import { IsEnum, IsMongoId, IsOptional, IsString } from 'class-validator';
import { PaginationDto } from '../../common';

export class GetContactsDto extends PaginationDto {
  @ApiProperty({ example: '', required: false })
  @IsString()
  @IsOptional()
  search: string;

  @ApiProperty({ example: '', required: false })
  @IsMongoId()
  @IsOptional()
  contractType: string;

  @ApiProperty({
    enum: EContractStatus,
    example: '',
    required: false,
  })
  @IsEnum(EContractStatus)
  @IsOptional()
  status: string;

  @ApiProperty({ example: '', required: false })
  @IsMongoId()
  @IsOptional()
  vendor: string;

  @ApiProperty({
    enum: EContractExpiry,
    example: '',
    required: false,
  })
  @IsEnum(EContractExpiry)
  @IsOptional()
  expiry: string;

  @ApiProperty({ example: '652ee528da86b788fd6ca7ea', required: false })
  @IsMongoId()
  @IsOptional()
  assetId: string;

  @ApiProperty({
    type: String,
    required: false,
    enum: EExportFile,
  })
  @IsEnum(EExportFile)
  @IsOptional()
  exportType: string;
}
