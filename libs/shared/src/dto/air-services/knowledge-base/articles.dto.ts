import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsISO8601,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';
import { paginationDTO } from '../../pagination/pagination.dto';
import { EArticlesStatus } from '@shared/constants';
import { IdDto } from '../../common';

export class WriteArticleRequestDTO {
  @ApiProperty({
    example: 'Lorem Ipsum is simply dummy text of the printing...',
  })
  @IsString()
  @IsNotEmpty()
  details: string;

  @ApiProperty({ example: '6541275fbbc8e76724cb773c' })
  @IsMongoId()
  @IsNotEmpty()
  folder: string;

  @ApiProperty({ example: '#tags' })
  @IsString()
  @IsOptional()
  tags: string;

  @ApiProperty({ example: 'keywords' })
  @IsString()
  @IsOptional()
  keywords: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  @IsNotEmpty()
  isApprovel: boolean;

  @ApiProperty({ example: '63f729ebfffff62317142f74' })
  @ValidateIf((value) => value.isApprovel === true)
  @IsMongoId()
  approver: string;

  @ApiProperty({ example: new Date().toISOString().slice(0, 10) })
  @ValidateIf((value) => value.isApprovel === true)
  @IsISO8601()
  reviewDate: Date;

  author?: string;

  organizationId?: string;

  isApproved?: boolean;

  status?: string;
}

export class WriteArticleResponseDto {
  @ApiProperty({ example: 201, description: 'HTTP status code' })
  statusCode: number;

  @ApiProperty({ example: 'Success', description: 'Response message' })
  message: string;

  @ApiProperty({
    example: {
      _id: '65439dc63b51ed7e9db8b08c',
      details: 'Lorem Ipsum is simply dummy text of the printing...',
      folder: '6541275fbbc8e76724cb773c',
      tags: '#tags',
      keywords: 'keywords',
      isApprovel: true,
      approver: '63f729ebfffff62317142f74',
      reviewDate: '2023-11-02T00:00:00.000Z',
      status: 'DRAFT',
      author: '653be0ede94d507754aa6738',
      createdAt: '2023-11-02T13:01:58.073Z',
      updatedAt: '2023-11-02T13:01:58.073Z',
    },
    description: 'Response data object',
  })
  data: {};

  @ApiProperty({ example: null, description: 'Error details (if any)' })
  error: null | string;
}

export class GetArticlesRequestDto extends paginationDTO {
  @ApiProperty({ type: String, example: '', required: false })
  @IsString()
  @IsOptional()
  search: string;

  @ApiProperty({
    type: String,
    example: '',
    required: false,
  })
  @IsMongoId()
  @IsOptional()
  authorId: string;

  @ApiProperty({
    type: String,
    example: '',
    required: false,
  })
  @IsMongoId()
  @IsOptional()
  folderId: string;

  @ApiProperty({
    type: String,
    enum: EArticlesStatus,
    example: '',
    required: false,
  })
  @IsEnum(EArticlesStatus)
  @IsOptional()
  status: string;

  organizationId?: string;
}

export class GetArticlesResponseDto {
  @ApiProperty({ example: 200, description: 'HTTP status code' })
  statusCode: number;

  @ApiProperty({ example: 'Success', description: 'Response message' })
  message: string;

  @ApiProperty({ type: Object, example: {}, description: 'List of articles' })
  data: {};

  @ApiProperty({
    type: Object,
    example: {},
    description: 'Pagination metadata',
  })
  metadata: {};

  @ApiProperty({ example: null, description: 'Error details (if any)' })
  error: null | string;
}

export class GetUnapprovedArticlesRequestDto extends paginationDTO {
  userId?: string;

  organizationId?: string;
}

export class GetUnapprovedArticlesResponseDto extends GetArticlesResponseDto {}

export class UpdateArticleRequestDto extends PartialType(
  WriteArticleRequestDTO
) {
  @ApiProperty({ example: '6543af689999bc729ce962b4' })
  @IsMongoId()
  @IsNotEmpty()
  id: string;

  @ValidateIf((value) => value.isApprovel === true)
  @IsMongoId()
  approver: string;

  @ValidateIf((value) => value.isApprovel === true)
  @IsISO8601()
  reviewDate: Date;
}

export class UpdateArticleResponseDto {
  @ApiProperty({ example: 200, description: 'HTTP status code' })
  statusCode: number;

  @ApiProperty({
    example: 'Update successfully',
    description: 'Response message',
  })
  message: string;

  @ApiProperty({
    example: {
      _id: '6543a1b4a12f3e109bfbbb34',
      details: 'Lorem Ipsum is simply dummy text of the printing...',
      folder: '6543af689999bc729ce962b4',
      tags: '#tags',
      keywords: 'keywords',
      isApprovel: false,
      reviewDate: '2023-11-02T00:00:00.000Z',
      status: 'PUBLISHED',
      author: '653be0ede94d507754aa6738',
      isApproved: true,
      createdAt: '2023-11-02T13:18:44.936Z',
      updatedAt: '2023-11-02T15:35:04.691Z',
    },
    description: 'Response data object',
  })
  data: {};

  @ApiProperty({ example: null, description: 'Error details (if any)' })
  error: null | string;
}

export class DeleteArticleRequestDto {
  @ApiProperty({
    example: ['651e6368a3a6baf2f193efb0', '65154bdc3064871640f8ce14'],
    description: 'Array of MongoDB IDs',
  })
  @IsArray()
  @IsMongoId({
    each: true,
  })
  ids: string[];
}

export class DeleteArticleResponseDto {
  @ApiProperty({ example: 200, description: 'HTTP status code' })
  statusCode: number;

  @ApiProperty({
    example: 'Deleted successfully',
    description: 'Response message',
  })
  message: string;

  @ApiProperty({
    example: {
      acknowledged: true,
      deletedCount: 1,
    },
    description: 'Response data object',
  })
  data: {};

  @ApiProperty({ example: null, description: 'Error details (if any)' })
  error: null | string;
}
