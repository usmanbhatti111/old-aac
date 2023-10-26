import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { EStatusToggle } from '../../constants/enums';
import { ApiSingleFile } from '../../custom';
import { MediaObject } from '../common';

export class EditProductDto {
  @ApiProperty({
    type: String,
    required: false,
    example: 'Sales',
  })
  @IsNotEmpty()
  @IsOptional()
  name: string;

  @ApiProperty({
    type: String,
    required: false,
    example: 'Manage your sales with Air Apple Cart',
  })
  @IsNotEmpty()
  @IsOptional()
  description: string;

  @ApiProperty({
    type: String,
    required: false,
    example: EStatusToggle.ACTIVE,
    enum: EStatusToggle,
  })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  status: string;

  @ApiSingleFile({ required: false })
  @IsOptional()
  file: any;

  logo: MediaObject;
  updatedBy: string;
  id: string;
}
