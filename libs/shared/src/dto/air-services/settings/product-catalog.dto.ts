import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { toMongoObjectId } from '../../../functions';
import { EModeOfProcurement, EProductCatalogStatus } from '@shared/constants';

export class AddProductCatalogRequestDTO {
  @ApiProperty({
    example: 'Lorem Ipsum',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: String,
    example: '652d19a5b5f5fc0c40275467',
    required: true,
  })
  @IsNotEmpty()
  @Transform(toMongoObjectId)
  assetType: string;

  @ApiProperty({
    example: 'Lorem Ipsum',
  })
  @IsString()
  @IsNotEmpty()
  manufacturer: string;

  @ApiProperty({
    type: String,
    enum: EProductCatalogStatus,
    example: EProductCatalogStatus.IN_PRODUCTION,
  })
  @IsEnum(EProductCatalogStatus)
  @IsNotEmpty()
  status: string;

  @ApiProperty({
    type: String,
    enum: EModeOfProcurement,
    example: EModeOfProcurement.BUY,
  })
  @IsEnum(EModeOfProcurement)
  @IsNotEmpty()
  modeOfProcurement: string;

  @ApiProperty({
    example: 'Lorem Ipsum',
  })
  @IsString()
  @IsOptional()
  description: string;

  companyId: string;

  createdBy: string;
}

export class AddProductCatalogResponseDto {
  @ApiProperty({ example: 201, description: 'HTTP status code' })
  statusCode: number;

  @ApiProperty({ example: 'Success', description: 'Response message' })
  message: string;

  @ApiProperty({
    example: {
      _id: '6565d928611db0d0406f207d',
      name: 'Lorem Ipsum',
      assetType: '652d19a5b5f5fc0c40275467',
      manufacturer: 'Lorem Ipsum',
      status: 'Lorem Ipsum',
      modeOfProcurement: 'Lorem Ipsum',
      description: 'Lorem Ipsum',
      createdBy: '655f2c6cd5116fe04d1219ac',
      createdAt: '2023-11-28T12:12:24.463Z',
      updatedAt: '2023-11-28T12:12:24.463Z',
    },
    description: 'Response data object',
  })
  data: {};

  @ApiProperty({ example: null, description: 'Error details (if any)' })
  error: null | string;
}
