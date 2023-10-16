import { ApiProperty } from '@nestjs/swagger';

export class CreateContactResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({ example: 'Success' })
  message: string;

  @ApiProperty({
    example: {
      _id: '65154bdc3064871640f8ce14',
      createdById: '65154bdc3064871640f8ce14',
      title: 'nodejs dev',
      jobType: 'FULL_TIME',
      jobCategory: 'SALES',
      experience: 'NO_EXPERIENCE',
      numberOfVacancy: 1,
      deadline: '2023-09-27T12:00:00Z',
      status: 'OPEN',
      isDeleted: 'false',
      description: '<h1>This is the description for job</h1>',
      createdAt: '2023-09-27T12:00:00Z',
      updatedAt: '2023-09-27T12:00:00Z',
    },
  })
  data: object;

  @ApiProperty({ example: null })
  errors: [];
}
