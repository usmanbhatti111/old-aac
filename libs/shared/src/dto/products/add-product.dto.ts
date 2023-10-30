import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { ApiSingleFile } from '../../custom';
import { MediaObject } from '../common';

export class AddProductDto {
  @ApiProperty({
    type: String,
    required: true,
    example: 'Sales',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: String,
    required: false,
    example: 'Manage your sales with Air Apple Cart',
  })
  @IsNotEmpty()
  @IsOptional()
  description: string;

  @ApiSingleFile({ required: false })
  @IsOptional()
  file: any;

  logo: MediaObject;
  createdBy: string;
}
