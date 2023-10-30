import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';
import { IdDto, PaginationDto } from '../common';

export interface IDealPipeline {
  name: string;
  isDefault?: boolean;
  stages?: string[];
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  createdBy?: string;
  updatedBy?: string;
  deletedBy?: string;
  isDeleted?: boolean;
}

export class StageDto {
  id?: string;
  @ApiProperty({
    example: 'Follow-up',
  })
  name: string;

  @ApiProperty({
    example: 60,
  })
  probability: number;
}
export class CreateDealPipelineDto implements IDealPipeline {
  @ApiProperty({
    example: 'deal name',
  })
  name: string;

  @ApiProperty({
    example: true,
  })
  isDefault?: boolean;

  stages?: string[];
  @ApiProperty({
    type: [StageDto],
  })
  dealStages?: StageDto[];

  createdBy?: string;
}

export class UpdateDealPipelineDto extends CreateDealPipelineDto {
  @ApiProperty({
    required: true,
    example: '65152939f50394f42cee2db4',
  })
  id?: string;

  updatedBy?: string;
}
export class DealPipelineDto {
  @ApiProperty({
    example: '168927646',
    description: 'The unique identifier for the organization.',
  })
  id: string;

  @ApiProperty({
    example: 'deal name',
  })
  name: string;

  @ApiProperty({
    type: [StageDto],
  })
  stages?: [StageDto];

  @ApiProperty({
    example: true,
  })
  isDefault?: boolean;
}

export class DealPipelineResponseDto {
  @ApiProperty({
    example: 200,
  })
  status: number;

  @ApiProperty({
    example: 'Success',
  })
  message: string;

  @ApiProperty({
    type: DealPipelineDto,
  })
  data: DealPipelineDto;

  @ApiProperty({
    example: '',
  })
  error: string;
}

export class DealPipelinesResponseDto {
  @ApiProperty({
    example: 200,
  })
  status: number;

  @ApiProperty({
    example: 'Success',
  })
  message: string;

  @ApiProperty({
    type: [DealPipelineDto],
  })
  data: DealPipelineDto[];

  @ApiProperty({
    example: '',
  })
  error: string;
}

export class DeleteDealPipelineResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({ example: 'Success' })
  message: string;

  @ApiProperty({})
  data: {};

  @ApiProperty({ example: null })
  errors: [];
}

export class DeleteDealPipelineDto extends IdDto {
  deletedBy: string;
}

export class GetDealPipelinesDto extends PaginationDto {
  @ApiProperty({
    type: String,
    required: false,
    description: 'Search By name',
  })
  @IsNotEmpty()
  @IsOptional()
  search: string;
}
