import { ApiProperty } from '@nestjs/swagger';
import {
  BillingCycleEnum,
  EExtendRenewStatus,
  LicenceTypeEnum,
} from '../../../constants/enums';
import {
  IsBoolean,
  IsNotEmpty,
  IsString,
  IsMongoId,
  IsISO8601,
  IsEnum,
  IsOptional,
  IsNumber,
  ArrayNotEmpty,
  IsArray,
} from 'class-validator';
import mongoose from 'mongoose';
import { ApiSingleFile } from 'libs/shared/src/custom';
import { AttachmentDTO } from '../../common';
export class DeleteContractDto {
  @ApiProperty({
    example: '651e6368a3a6baf2f193efb0',
  })
  @IsMongoId()
  @IsNotEmpty()
  id: string;
}

export class AddAssetToContractDto {
  @IsNotEmpty()
  @ApiProperty({
    type: [String],
  })
  contractIds: [string];
}
export class DeleteAssetToContractDto {
  @IsNotEmpty()
  @ApiProperty({
    type: [String],
  })
  assetsIds: [string];
}
export class ItemsDetailDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Service Name',
    required: false,
  })
  serviceName: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Per Unit',
    required: false,
  })
  principleModel: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    example: 12,
    required: false,
  })
  cost: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    example: 5,
    required: true,
  })
  count: number;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'Comments',
    required: false,
  })
  comments: string;
}
export class CreateContractDTO extends AttachmentDTO {
  @ApiProperty({ example: 'contract name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'CNTW-6' })
  @IsString()
  @IsNotEmpty()
  contractNumber: string;

  @ApiProperty({ example: '651d72b06c9932a97b031a34' })
  @IsMongoId()
  @IsNotEmpty()
  contractType: string;

  @ApiProperty({ type: Number, example: 200 })
  @IsNumber()
  @IsOptional()
  cost: string;

  @ApiProperty({ example: '651d72b06c9932a97b031a34' })
  @IsMongoId()
  @IsOptional()
  vendor: string;

  @ApiProperty({ example: new Date().toISOString().slice(0, 10) })
  @IsISO8601()
  @IsNotEmpty()
  startDate: string;

  @ApiProperty({
    example: new Date(new Date().setFullYear(new Date().getFullYear() + 1))
      .toISOString()
      .slice(0, 10),
  })
  @IsISO8601()
  @IsNotEmpty()
  endDate: string;

  @ApiProperty({ example: false })
  @IsBoolean()
  @IsOptional()
  autoRenew: boolean;

  @ApiProperty({ example: true })
  @IsBoolean()
  @IsOptional()
  notifyExpiry: boolean;

  @ApiProperty({ example: '651d72b06c9932a97b031a34' })
  @IsMongoId()
  @IsOptional()
  approver: string;

  @ApiProperty({ example: '652ee528da86b788fd6ca7ea' })
  @IsMongoId()
  @IsOptional()
  assetId: string;

  @ApiProperty({ example: '652ee528da86b788fd6ca7ea' })
  @IsMongoId()
  @IsOptional()
  moduleId: string;

  @IsOptional()
  @ApiProperty({
    type: [ItemsDetailDto],
    required: false,
  })
  itemsDetail: ItemsDetailDto[];

  @ApiProperty({
    enum: BillingCycleEnum,
    required: false,
    example: BillingCycleEnum.MONTHLY,
  })
  @ApiProperty({
    enum: BillingCycleEnum,
    required: false,
    example: BillingCycleEnum.MONTHLY,
  })
  @IsOptional()
  billingCycle: string;

  @ApiProperty({
    enum: LicenceTypeEnum,
    required: false,
    example: LicenceTypeEnum.ENTERPRISE,
  })
  @IsOptional()
  licenseType: string;

  @ApiProperty({ example: 'License Key' })
  @IsString()
  @IsNotEmpty()
  licenseKey: string;
}
export class UpdateContractDTO {
  @ApiProperty({
    required: true,
    example: '65152939f50394f42cee2db4',
  })
  id: string;

  @ApiProperty({ example: 'Microsoft', required: false })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({ example: 'CNTW-6', required: false })
  @IsString()
  @IsNotEmpty()
  contractNumber: string;

  @ApiProperty({ example: 'type', required: false })
  @IsString()
  @IsNotEmpty()
  type: string;

  @ApiProperty({ type: Number, example: 200 })
  @IsNumber()
  @IsOptional()
  cost: number;

  @ApiProperty({ example: '20', required: false })
  @IsString()
  @IsNotEmpty()
  status: string;

  @ApiProperty({ example: '651d72b06c9932a97b031a34' })
  @IsMongoId()
  @IsOptional()
  vendor: string;

  @ApiProperty({ example: new Date().toISOString().slice(0, 10) })
  @IsISO8601()
  @IsNotEmpty()
  startDate: string;

  @ApiProperty({
    example: new Date(new Date().setFullYear(new Date().getFullYear() + 1))
      .toISOString()
      .slice(0, 10),
  })
  @IsISO8601()
  @IsNotEmpty()
  endDate: string;

  @ApiProperty({ example: '651d72b06c9932a97b031a34' })
  @IsMongoId()
  @IsOptional()
  approver: string;

  @ApiProperty({ example: false, required: false })
  @IsBoolean()
  @IsNotEmpty()
  autoRenew: boolean;

  @ApiProperty({ example: true, required: false })
  @IsBoolean()
  @IsNotEmpty()
  notifyExpiry: boolean;

  @ApiProperty({ example: '651d8c552d3ef0d603ed4210', required: false })
  @IsString()
  @IsNotEmpty()
  assetId: string;
}
export class ExtendRenewContractDTO {
  @ApiProperty({
    required: true,
    example: '65152939f50394f42cee2db4',
  })
  id: string;
  @ApiProperty({
    enum: EExtendRenewStatus,
    required: true,
  })
  @IsEnum(EExtendRenewStatus)
  statusRenewExtend: string;

  @ApiProperty({ example: '200', required: true })
  @IsString()
  @IsNotEmpty()
  cost: string;

  @ApiProperty({ example: '651d72b06c9932a97b031a34' })
  @IsMongoId()
  @IsOptional()
  approver: string;

  @ApiProperty({ example: new Date().toISOString().slice(0, 10) })
  @IsISO8601()
  @IsNotEmpty()
  startDate: string;

  @ApiProperty({
    example: new Date(new Date().setFullYear(new Date().getFullYear() + 1))
      .toISOString()
      .slice(0, 10),
  })
  @IsISO8601()
  @IsNotEmpty()
  endDate: string;
}
