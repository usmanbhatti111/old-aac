import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsISO8601,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { paginationDTO } from '../pagination/pagination.dto';

export class AddPaymentMethodDto {
  @ApiProperty({
    example: '1111 1111 1111 1111',
  })
  @IsString()
  @IsNotEmpty()
  cardNumber: string;

  @ApiProperty({
    example: '2023-04-30',
  })
  @IsISO8601({ strict: true })
  @IsNotEmpty()
  expirationDate: Date;

  @ApiProperty({
    example: 'Doctor Strange',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 111,
  })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  cvvCode?: number;

  @ApiProperty({
    example: true,
    default: false,
  })
  @IsBoolean()
  useCompanyAddress: boolean;

  @ApiProperty({
    example: true,
    default: false,
  })
  @IsBoolean()
  allowAdminToSee: boolean;

  @ApiProperty({
    example: ['65152930f50394f42cee2db3'],
  })
  @IsArray()
  manageSubscriptionFor: string[];

  @ApiProperty({
    example: false,
    default: false,
  })
  @IsBoolean()
  isDeleted: boolean;

  orgId: string;
}

export class AddPaymentMethodResponseDto {
  @ApiProperty()
  cardNumber: string;

  @ApiProperty()
  expirationDate: Date;

  @ApiProperty()
  name: string;

  @ApiProperty()
  cvvCode?: number;

  @ApiProperty()
  useCompanyAddress: boolean;

  @ApiProperty()
  allowAdminToSee: boolean;

  @ApiProperty()
  manageSubscriptionFor: string[];

  @ApiProperty()
  isDeleted: boolean;
}

export class GetOnePaymentDto {
  @ApiProperty({
    example: '651e6368a3a6baf2f193efb0',
  })
  @IsMongoId()
  @IsNotEmpty()
  id: string;

  orgId: string;
}

export class DeletePaymentDto {
  @ApiProperty({
    example: '651e6368a3a6baf2f193efb0',
  })
  @IsMongoId()
  @IsNotEmpty()
  id: string;
}

export class UpdatePaymentMethodDto {
  @ApiProperty({
    example: '1111 1111 1111 1111',
  })
  @IsString()
  @IsNotEmpty()
  cardNumber: string;

  @ApiProperty({
    example: '2023-04-30',
  })
  @IsISO8601({ strict: true })
  @IsNotEmpty()
  expirationDate: Date;

  @ApiProperty({
    example: 'Doctor Strange',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 111,
  })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  cvvCode?: number;

  @ApiProperty({
    example: true,
    default: false,
  })
  @IsBoolean()
  useCompanyAddress: boolean;

  @ApiProperty({
    example: true,
    default: false,
  })
  @IsBoolean()
  allowAdminToSee: boolean;

  @ApiProperty({
    example: ['65152930f50394f42cee2db3'],
  })
  @IsArray()
  manageSubscriptionFor: string[];

  @ApiProperty({
    example: false,
    default: false,
  })
  @IsBoolean()
  isDeleted: boolean;

  orgId: string;

  id?: string;
}

export class getAllPaymentsDTO extends paginationDTO {
  orgId: string;
}
