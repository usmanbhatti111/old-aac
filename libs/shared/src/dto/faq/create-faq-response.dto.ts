import { ApiProperty } from '@nestjs/swagger';

export class CreateFaqResponseDto {
  @ApiProperty({ example: 201 })
  statusCode: number;

  @ApiProperty({ example: 'Success' })
  message: string;

  @ApiProperty({
    example: {
      _id: '654348daf31166272926a413',
      faqQuestion: 'test question 3',
      faqCategory: 'SALES',
      faqAnswer: 'test answer 3',
      createdBy: '6541fed9398b214df0eda809',
      isDeleted: false,
      createdAt: '2023-11-02T06:59:38.163Z',
      updatedAt: '2023-11-02T06:59:38.163Z',
    },
  })
  data: object;

  @ApiProperty({ example: null })
  errors: [];
}
