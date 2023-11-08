import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';
import { paginationDTO } from '../../pagination/pagination.dto';
import { EExportFile } from '@shared/constants';

export class AssetsSoftwareDeviceDto {
  @IsNotEmpty()
  @IsMongoId()
  @ApiProperty({
    type: String,
    example: '652e7343f6a286db73b9da64',
    required: false,
  })
  softwareId: string;
}

export class GetSoftwareDevicesDto extends paginationDTO {
  @IsOptional()
  @IsMongoId()
  @ApiProperty({
    example: '651bdf53beeb02bc627d6804',
    required: false,
  })
  deviceId: string;

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
