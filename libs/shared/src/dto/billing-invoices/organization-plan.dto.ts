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

export class AssignOrgPlanDto {
  @ApiProperty({
    example: '',
  })
  @IsMongoId()
  @IsNotEmpty()
  organizationId: string;

  @ApiProperty({
    example: '',
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
    example: '',
  })
  @IsISO8601({ strict: true })
  @IsNotEmpty()
  billingDate: Date;

  assignedBy?: string;
}

export class ListOrgPlan {
  @ApiProperty({ example: 1, required: false })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  page: number;

  @ApiProperty({ example: 1, required: false })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  limit: number;

  @ApiProperty({
    example: '',
    required: false,
  })
  @IsString()
  @IsOptional()
  product: string;

  @ApiProperty({
    example: '',
    required: false,
  })
  @IsString()
  @IsOptional()
  planType: string;
}

export class AssignOrgPlanResponseDto {
  @ApiProperty({ example: 201 })
  statusCode: string;

  @ApiProperty({ example: 'Success' })
  message: string;

  @ApiProperty({
    example: {
      id: '651e6657364160a7fca7921e',
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

export class ListOrgPlanResponseDto {
  @ApiProperty({ example: 201 })
  statusCode: string;

  @ApiProperty({ example: 'Success' })
  message: string;

  @ApiProperty({
    example: {
      organizationplans: [
        {
          _id: '65237f4a972203079f83918c',
          organizationId: '651e6b916318ccd41e81e7a4',
          planId: '651e6b916318ccd41e81e7a4',
          additionalUsers: 2,
          additionalStorage: 5,
          planDiscount: 10,
          billingCycle: 'MONTHLY',
          billingDate: '2023-12-11T00:00:00.000Z',
          status: 'ACTIVE',
          assignedBy: [],
          createdAt: '2023-10-09T04:19:22.308Z',
          updatedAt: '2023-10-09T04:19:22.308Z',
          __v: 0,
        },
      ],
      meta: {
        page: 1,
        pages: 1,
        limit: 10,
        total: 1,
      },
    },
  })
  data: object;

  @ApiProperty({ example: null })
  error: string;
}

export class GetOrgPlanResponseDto {
  @ApiProperty({ example: 201 })
  statusCode: string;

  @ApiProperty({ example: 'Success' })
  message: string;

  @ApiProperty({
    example: {
      _id: '65237f4a972203079f83918c',
      organizationId: '651e6b916318ccd41e81e7a4',
      planId: '651e6b916318ccd41e81e7a4',
      additionalUsers: 2,
      additionalStorage: 5,
      planDiscount: 10,
      billingCycle: 'MONTHLY',
      billingDate: '2023-12-11T00:00:00.000Z',
      status: 'ACTIVE',
      assignedBy: [],
      createdAt: '2023-10-09T04:19:22.308Z',
      updatedAt: '2023-10-09T04:19:22.308Z',
      __v: 0,
    },
  })
  data: object;

  @ApiProperty({ example: null })
  error: string;
}
