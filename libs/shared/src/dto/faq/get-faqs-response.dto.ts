import { ApiProperty } from '@nestjs/swagger';

export class GetJobsResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({ example: 'Success' })
  message: string;

  @ApiProperty({
    example: {
      faqs: [
        {
          _id: '6543452818c6c6eea284ce7f',
          faqQuestion: 'test question 2',
          faqCategory: 'SALES',
          faqAnswer: 'test answer 2',
          createdBy: {
            _id: '6541fed9398b214df0eda809',
            name: 'super admin 1',
          },
          isDeleted: false,
          createdAt: '2023-11-02T06:43:52.747Z',
          updatedAt: '2023-11-02T06:43:52.747Z',
        },
        {
          _id: '654344c34ca27b6d9e944245',
          faqQuestion: 'test question',
          faqCategory: 'SALES',
          faqAnswer: 'test answer',
          createdBy: {
            _id: '6541fed9398b214df0eda809',
            name: 'super admin 1',
          },
          isDeleted: false,
          createdAt: '2023-11-02T06:42:11.335Z',
          updatedAt: '2023-11-02T06:42:11.335Z',
        },
      ],
      meta: {
        page: 1,
        pages: 1,
        limit: 10,
        total: 2,
      },
    },
  })
  data: {};

  @ApiProperty({ example: null })
  errors: [];
}
