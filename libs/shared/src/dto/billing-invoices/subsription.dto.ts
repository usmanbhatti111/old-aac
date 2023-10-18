import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsISO8601,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import {
  BillingCycleEnum,
  OrganizationPlanStatusEnum,
} from '../../constants/enums';

export class getAllSubscriptionDto {
  @ApiProperty({
    example: '',
  })
  @IsMongoId()
  @IsNotEmpty()
  organizationPlanId: string;

  @ApiProperty({
    example: '',
  })
  @IsISO8601()
  @IsNotEmpty()
  dueDate;

  @ApiProperty({
    example: '',
  })
  @IsString()
  @IsNotEmpty()
  billingCycle;

  @ApiProperty({
    example: '',
  })
  @IsMongoId()
  @IsNotEmpty()
  planId;

  @ApiProperty({
    example: '',
  })
  @IsMongoId()
  @IsNotEmpty()
  productId;

  @ApiProperty({
    example: '',
  })
  @IsString()
  @IsNotEmpty()
  productName;

  @ApiProperty({
    example: '',
  })
  @IsString()
  @IsNotEmpty()
  planType;

  @ApiProperty({
    example: 10,
  })
  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  planPrice;

  @ApiProperty({
    example: 10,
  })
  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  defaultUsers;

  @ApiProperty({
    example: 10,
  })
  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  defaultStorage;

  @ApiProperty({
    example: 10,
  })
  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  unitUserCost;

  @ApiProperty({
    example: 10,
  })
  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  unitStorageCost;

  @ApiProperty({
    example: 10,
  })
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  additionalUsers;

  @ApiProperty({
    example: 10,
  })
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  additionalStorage;

  @ApiProperty({
    example: 10,
  })
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  subTotal;

  @ApiProperty({
    example: 10,
  })
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  planDiscount;

  @ApiProperty({
    example: 10,
  })
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  tax;

  @ApiProperty({
    example: 10,
  })
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  invoiceDiscount?: number;

  createdBy?: string;
}

export class GetAllAssignPlanResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: string;

  @ApiProperty({ example: 'Success' })
  message: string;

  @ApiProperty({
    example: [
      {
        _id: '651e6657364160a7fca7921e',
        organizationId: '57152930f50394f71cxz2cd7',
        planId: '31172930f50394f42cee4da5',
        additionalUsers: 2,
        additionalStorage: 5,
        planDiscount: 10,
        billingCycle: 'MONTHLY',
        billingDate: '2023-12-12T00:00:00.000+00:00',
        status: 'ACTIVE',
        assignedBy: '65152930f50394f42cee2db3',
        created_at: '2023-10-05T07:31:35.099+00:00',
        updated_at: '2023-10-05T07:31:35.099+00:00',
        deleted_at: '2023-10-05T07:31:35.099+00:00',
      },
    ],
  })
  data: object;

  @ApiProperty({ example: null })
  error: string;
}

export class AssignOrgPlanOrgAdminDto {
  @ApiProperty({
    example: '6526558a8f723637f754487d',
  })
  @IsMongoId()
  @IsNotEmpty()
  planId: string;

  @ApiProperty({
    example: 0,
  })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  additionalUsers?: number;

  @ApiProperty({
    example: 0,
  })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  additionalStorage?: number;

  @ApiProperty({
    example: 0,
  })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  planDiscount?: number;

  @ApiProperty({
    example: '2023-10-20',
  })
  @IsISO8601({ strict: true })
  @IsNotEmpty()
  billingDate: Date;

  @ApiProperty({
    required: false,
    enum: OrganizationPlanStatusEnum,
    default: OrganizationPlanStatusEnum.ACTIVE,
  })
  status: OrganizationPlanStatusEnum;

  @ApiProperty({
    type: String,
    required: false,
    enum: BillingCycleEnum,
  })
  billingCycle: BillingCycleEnum;

  organizationId: string;
  assignedBy?: string;
}

export class AssignOrgPlanResponseOrgAdminDto {
  @ApiProperty({ example: 201 })
  statusCode: string;

  @ApiProperty({ example: 'Success' })
  message: string;

  @ApiProperty({
    example: {
      _id: '651e6657364160a7fca7921e',
      organizationId: '57152930f50394f71cxz2cd7',
      planId: '31172930f50394f42cee4da5',
      additionalUsers: 2,
      additionalStorage: 5,
      planDiscount: 10,
      billingCycle: 'MONTHLY',
      billingDate: '2023-12-12T00:00:00.000+00:00',
      status: 'ACTIVE',
      assignedBy: '65152930f50394f42cee2db3',
      created_at: '2023-10-05T07:31:35.099+00:00',
      updated_at: '2023-10-05T07:31:35.099+00:00',
      deleted_at: '2023-10-05T07:31:35.099+00:00',
    },
  })
  data: object;

  @ApiProperty({ example: null })
  error: string;
}

export class UpdateAssignOrgPlanOrgAdminDto {
  @ApiProperty({
    example: '6526558a8f723637f754487d',
  })
  @IsMongoId()
  @IsNotEmpty()
  planId: string;

  @ApiProperty({
    example: 0,
  })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  additionalUsers?: number;

  @ApiProperty({
    example: 0,
  })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  additionalStorage?: number;

  @ApiProperty({
    example: 0,
  })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  planDiscount?: number;

  @ApiProperty({
    example: '2023-10-20',
  })
  @IsISO8601({ strict: true })
  @IsNotEmpty()
  billingDate: Date;

  @ApiProperty({
    required: false,
    enum: OrganizationPlanStatusEnum,
    default: OrganizationPlanStatusEnum.ACTIVE,
  })
  status: OrganizationPlanStatusEnum;

  @ApiProperty({
    type: String,
    required: false,
    enum: BillingCycleEnum,
  })
  billingCycle: BillingCycleEnum;

  organizationPlanId?: string;
  organizationId: string;
  assignedBy: string;
}

export class UpdateAssignOrgPlanResponseOrgAdminDto {
  @ApiProperty({ example: 200 })
  statusCode: string;

  @ApiProperty({ example: 'Success' })
  message: string;

  @ApiProperty({
    example: {
      _id: '651e6657364160a7fca7921e',
      organizationId: '57152930f50394f71cxz2cd7',
      planId: '31172930f50394f42cee4da5',
      additionalUsers: 2,
      additionalStorage: 5,
      planDiscount: 10,
      billingCycle: 'MONTHLY',
      billingDate: '2023-12-12T00:00:00.000+00:00',
      status: 'ACTIVE',
      assignedBy: '65152930f50394f42cee2db3',
      created_at: '2023-10-05T07:31:35.099+00:00',
      updated_at: '2023-10-05T07:31:35.099+00:00',
      deleted_at: '2023-10-05T07:31:35.099+00:00',
    },
  })
  data: object;

  @ApiProperty({ example: null })
  error: string;
}

export class OrganizationPlanId {
  @ApiProperty({
    example: '6524f1d3df46444d10994854',
  })
  @IsMongoId()
  @IsNotEmpty()
  organizationPlanId: string;
}

export class UpdateAssignOrgPlanSuperAdminDto {
  @ApiProperty({
    example: '6526558a8f723637f754487d',
  })
  @IsMongoId()
  @IsNotEmpty()
  planId: string;

  @ApiProperty({
    example: 0,
  })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  additionalUsers?: number;

  @ApiProperty({
    example: 0,
  })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  additionalStorage?: number;

  @ApiProperty({
    example: 0,
  })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  planDiscount?: number;

  @ApiProperty({
    example: '2023-10-20',
  })
  @IsISO8601({ strict: true })
  @IsNotEmpty()
  billingDate: Date;

  @ApiProperty({
    required: false,
    enum: OrganizationPlanStatusEnum,
    default: OrganizationPlanStatusEnum.ACTIVE,
  })
  status: OrganizationPlanStatusEnum;

  @ApiProperty({
    type: String,
    required: false,
    enum: BillingCycleEnum,
  })
  billingCycle: BillingCycleEnum;

  organizationPlanId?: string;
  organizationId: string;
  assignedBy: string;
}

export class UpdateAssignOrgPlanResponseSuperAdminDto {
  @ApiProperty({ example: 200 })
  statusCode: string;

  @ApiProperty({ example: 'Success' })
  message: string;

  @ApiProperty({
    example: {
      _id: '651e6657364160a7fca7921e',
      organizationId: '57152930f50394f71cxz2cd7',
      planId: '31172930f50394f42cee4da5',
      additionalUsers: 2,
      additionalStorage: 5,
      planDiscount: 10,
      billingCycle: 'MONTHLY',
      billingDate: '2023-12-12T00:00:00.000+00:00',
      status: 'ACTIVE',
      assignedBy: '65152930f50394f42cee2db3',
      created_at: '2023-10-05T07:31:35.099+00:00',
      updated_at: '2023-10-05T07:31:35.099+00:00',
      deleted_at: '2023-10-05T07:31:35.099+00:00',
    },
  })
  data: object;

  @ApiProperty({ example: null })
  error: string;
}
