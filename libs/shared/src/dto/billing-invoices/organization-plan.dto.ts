import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsISO8601,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class AssignOrganizationPlanDto {
  @ApiProperty({
    example: '',
  })
  @IsString()
  @IsNotEmpty()
  organizationId: string;

  @ApiProperty({
    example: '',
  })
  @IsString()
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

export class AssignOrganizationPlanResponseDto {
  @ApiProperty({ example: 201 })
  statusCode: string;

  @ApiProperty({ example: 'Success' })
  message: string;

  @ApiProperty({
    example: {
      id: 'string',
      organizationId: 'string',
      planId: 'string',
      additionalUsers: 'number',
      additionalStorage: 'number',
      planDiscount: 'number',
      billingDate: '2023-12-12',
      status: 'string',
      assignedBy: 'string',
      created_at: '2023-10-06',
      updated_at: '2023-10-06',
      deleted_at: '2023-10-06',
    },
  })
  data: object;

  @ApiProperty({ example: null })
  error: string;
}
