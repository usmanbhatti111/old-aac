import { ApiProperty } from '@nestjs/swagger';
import {
  AssetSoftwareCreatedAtEnum,
  AssetsSoftwareStatusEnum,
  AssetsSoftwareTypeEnum,
} from '@shared/constants';
import { IsOptional } from 'class-validator';

export class GetAssetsSoftwareDetails {
  @IsOptional()
  @ApiProperty({
    type: String,
    required: false,
    enum: AssetsSoftwareStatusEnum,
  })
  status: string;
  @IsOptional()
  @ApiProperty({
    type: String,
    required: false,
    enum: AssetsSoftwareTypeEnum,
  })
  type: string;

  @IsOptional()
  @ApiProperty({
    type: String,
    required: false,
    enum: AssetSoftwareCreatedAtEnum,
  })
  createdDate: string;
  @IsOptional()
  @ApiProperty({
    type: String,
    required: false,
    enum: AssetSoftwareCreatedAtEnum,
  })
  updatedDate: string;
  @IsOptional()
  @ApiProperty({
    type: String,
    required: false,
  })
  search: string;
}
