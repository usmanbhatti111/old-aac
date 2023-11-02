import { ApiProperty } from '@nestjs/swagger';
import {
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
