import { ApiProperty } from '@nestjs/swagger';

export class CreateJobResponseDto {
  @ApiProperty({ example: 201 })
  statusCode: number;

  @ApiProperty({ example: 'Success' })
  message: string;

  @ApiProperty({
    example: {
      _id: '6542010541ea55b95a225453',
      title: 'reactjs dev',
      jobType: 'FULL_TIME',
      jobCategory: 'SALES',
      experience: 'NO_EXPERIENCE',
      numberOfVacancy: 1,
      deadline: '2023-11-01T18:59:59.999Z',
      status: 'OPEN',
      description: '<h1>This is the description for job</h1>',
      createdBy: '6541fed9398b214df0eda809',
      isDeleted: false,
      createdAt: '2023-11-01T07:40:53.587Z',
      updatedAt: '2023-11-01T07:40:53.587Z',
    },
  })
  data: object;

  @ApiProperty({ example: null })
  errors: [];
}
