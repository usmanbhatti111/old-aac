import { ApiProperty } from '@nestjs/swagger';
import { EFaqCategories } from '../../constants';

export class CreateFaqDto {
  @ApiProperty({
    required: true,
    example: 'test question',
  })
  faqQuestion: string;

  @ApiProperty({
    enum: EFaqCategories,
    type: String,
    required: true,
  })
  faqCategory: string;

  @ApiProperty({
    example: 'test answer',
    required: true,
  })
  faqAnswer: string;

  @ApiProperty({
    example: '5f8b14d073bce3c5f404f78c',
  })
  createdById: string;
}

export class UpdateFaqDto {
  @ApiProperty({
    required: true,
    example: '65152939f50394f42cee2db4',
  })
  id: string;

  @ApiProperty({
    required: true,
    example: 'test question',
  })
  faqQuestion: string;

  @ApiProperty({
    enum: EFaqCategories,
    type: String,
    required: true,
  })
  faqCategory: string;

  @ApiProperty({
    example: 'test answer',
    required: true,
  })
  faqAnswer: string;
}

export class CreateFaqResponseDto {
  @ApiProperty({ example: 201 })
  statusCode: number;

  @ApiProperty({ example: 'Success' })
  message: string;

  @ApiProperty({
    example: {
      faqQuestion: 'test question',
      faqCategory: 'SALES',
      faqAnswer: 'test answer',
      createdById: '5f8b14d073bce3c5f404f78c',
      isDeleted: false,
      _id: '651f8ef1ce48c8eb739ca5ae',
      createdAt: '2023-10-06T04:37:05.724Z',
      updatedAt: '2023-10-06T04:37:05.724Z',
    },
  })
  data: object;

  @ApiProperty({ example: null })
  errors: [];
}

export class GetFaqResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({ example: 'Success' })
  message: string;

  @ApiProperty({
    example: {
      _id: '651f8ef1ce48c8eb739ca5ae',
      faqQuestion: 'test question',
      faqCategory: 'SALES',
      faqAnswer: 'test answer',
      createdById: '5f8b14d073bce3c5f404f78c',
      isDeleted: false,
      createdAt: '2023-10-06T04:37:05.724Z',
      updatedAt: '2023-10-06T04:37:05.724Z',
    },
  })
  data: object;

  @ApiProperty({ example: null })
  errors: [];
}

export class GetFaqsResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({ example: 'Success' })
  message: string;

  @ApiProperty({
    example: [
      {
        _id: '651f8ef1ce48c8eb739ca5ae',
        faqQuestion: 'test question',
        faqCategory: 'SALES',
        faqAnswer: 'test answer',
        createdById: '5f8b14d073bce3c5f404f78c',
        isDeleted: false,
        createdAt: '2023-10-06T04:37:05.724Z',
        updatedAt: '2023-10-06T04:37:05.724Z',
      },
    ],
  })
  data: [object];

  @ApiProperty({ example: 8 })
  count: number;

  @ApiProperty({
    example: [
      {
        page: 1,
        limit: 10,
        totalPages: 1,
        resultCount: 8,
        totalResult: 8,
      },
    ],
  })
  pagination: object;

  @ApiProperty({ example: null })
  errors: [];
}
