import { ApiProperty } from '@nestjs/swagger';

export class UpdateFaqResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({ example: 'Success' })
  message: string;

  @ApiProperty({
    example: {
      _id: '654344c34ca27b6d9e944245',
      faqQuestion: 'test question 1',
      faqCategory: 'SALES',
      faqAnswer: 'test answer 1',
      createdBy: '6541fed9398b214df0eda809',
      isDeleted: false,
      createdAt: '2023-11-02T06:42:11.335Z',
      updatedAt: '2023-11-02T06:58:26.903Z',
      updatedBy: '6541fed9398b214df0eda809',
    },
  })
  data: object;

  @ApiProperty({ example: null })
  errors: [];
}
