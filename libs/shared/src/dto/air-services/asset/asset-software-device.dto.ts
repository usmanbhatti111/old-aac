import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty } from 'class-validator';

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
