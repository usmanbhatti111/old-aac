import { ApiProperty } from '@nestjs/swagger';
import {
  AssetsSoftwareStatusEnum,
  AssetsSoftwareTypeEnum,
} from '@shared/constants';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AssetsSoftwareDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    required: true,
  })
  name: string;
  @ApiProperty({
    example: {
      description: 'Enter Description',
      publisher: 'Name of publisher',
      category: 'Any thing',
      managedBy: '6555e426560f7182109578c1',
    },
  })
  details: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    required: true,
    enum: AssetsSoftwareStatusEnum,
  })
  status: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    required: true,
    enum: AssetsSoftwareTypeEnum,
  })
  type: string;
}
