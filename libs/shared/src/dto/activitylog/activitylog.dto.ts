import { ApiProperty } from '@nestjs/swagger';
import {
  EActivityType,
  EActivitylogModule,
  UserRole,
} from '../../constants/enums';
import {
  IsEnum,
  IsISO8601,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { toMongoObjectId } from '../../functions';
import { PaginationDto } from '../common';

export class ActivitylogDto {
  @ApiProperty({
    type: String,
    example: '652d19a5b5f5fc0c40275467',
    required: true,
  })
  @IsNotEmpty()
  @Transform(toMongoObjectId)
  performedBy: string;

  @ApiProperty({
    type: String,
    enum: EActivityType,
    required: true,
  })
  @IsEnum(EActivityType)
  @IsNotEmpty()
  activityType: EActivityType;

  @ApiProperty({
    type: String,
    example: '652d19a5b5f5fc0c40275467',
    required: true,
  })
  @IsNotEmpty()
  @Transform(toMongoObjectId)
  firstModuleId: string;

  @ApiProperty({
    type: String,
    enum: EActivitylogModule,
    required: false,
  })
  @IsEnum(EActivitylogModule)
  @IsOptional()
  firstModuleName: EActivitylogModule;

  @ApiProperty({
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  firstModuleDisplayName: string;

  @ApiProperty({
    type: String,
    example: '652d19a5b5f5fc0c40275467',
    required: true,
  })
  @IsNotEmpty()
  @Transform(toMongoObjectId)
  secondModuleId: string;

  @ApiProperty({
    type: String,
    enum: EActivitylogModule,
    required: true,
  })
  @IsEnum(EActivitylogModule)
  @IsNotEmpty()
  secondModuleName: EActivitylogModule;

  @ApiProperty({
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  secondModuleDisplayName: string;
}

export interface ActivityLogParams {
  organizationId?: string;
  performedBy: string; // userId
  activityType: EActivityType; // CREATED, UPDATED
  module: EActivitylogModule; // module e.g PLANS
  moduleId: string; // module Id e.g response._id
  moduleName: string; // module name e.g response?.name
}

export class GetallActivitylogDTO extends PaginationDto {
  @ApiProperty({
    type: String,
    required: false,
    description: 'perform by Id',
  })
  @IsOptional()
  @Transform(toMongoObjectId)
  performedBy: string;

  @ApiProperty({
    type: String,
    required: false,
    description:
      'only SYSTEM ADMIN use this,for organization activities filter',
  })
  @IsOptional()
  @Transform(toMongoObjectId)
  orgId: string;

  @ApiProperty({
    type: String,
    enum: EActivityType,
    required: false,
    description: 'filter on Activity Type',
  })
  @IsEnum(EActivityType)
  @IsOptional()
  activityType: EActivityType;

  @ApiProperty({
    type: String,
    required: false,
    enum: EActivitylogModule,
    description: 'filter on Second Modules',
  })
  @IsOptional()
  @IsEnum(EActivitylogModule)
  module: EActivitylogModule;

  @ApiProperty({
    type: String,
    required: false,
    enum: UserRole,
    description: 'filter on User Role',
  })
  @IsOptional()
  @IsEnum(UserRole)
  userRole: UserRole;

  @ApiProperty({
    required: false,
    description: 'search on User Name',
  })
  @IsString()
  @IsOptional()
  search?: string;

  @ApiProperty({
    required: false,
    description: '2023-11-01',
  })
  @IsISO8601()
  @IsOptional()
  startDate?: string;

  @ApiProperty({
    required: false,
    description: '2023-11-30',
  })
  @IsISO8601()
  @IsOptional()
  endDate?: string;

  @Transform(toMongoObjectId)
  organizationId?: string;
}

export class GetallActivitylogResponseDTO {
  @ApiProperty({ example: 200 })
  statusCode: string;

  @ApiProperty({ example: 'Success' })
  message: string;

  @ApiProperty({
    example: {
      activitylogs: [
        {
          _id: '6549d436e0feed28d5506fd1',
          organizationId: '652e0304169f73fd01fd4956',
          performedBy: '6541f00578a1579d65d9bc7e',
          activityType: 'UPDATED',
          moduleId: '6549d338e9a9d68f1aa42f69',
          module: 'INVOICES',
          moduleName: 'Invoice',
          createdAt: '2023-11-07T06:07:50.723Z',
          performedByRole: 'SUPER_ADMIN',
          performedByName: 'mr khan',
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
