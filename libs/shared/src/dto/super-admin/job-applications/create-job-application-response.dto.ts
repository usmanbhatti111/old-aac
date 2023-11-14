import { ApiProperty } from '@nestjs/swagger';

export class CreateJobApplicationResponseDto {
  @ApiProperty({ example: 201 })
  statusCode: number;

  @ApiProperty({ example: 'Success' })
  message: string;

  @ApiProperty({
    example: {
      _id: '6551a4a4cd85b90a016683da',
      jobId: '65432a2709c93efb45e89e30',
      resume: {
        id: 'a16e49e3-0a8c-45f3-a170-ff8a34441c30',
        url: 'resumes/a16e49e3-0a8c-45f3-a170-ff8a34441c30.jpg',
        size: 53591,
        mimetype: 'image/jpeg',
      },
      coverLetter: {
        id: 'b9eaa98d-1a25-4382-b39e-5b03e1ae8801',
        url: 'coverLetters/b9eaa98d-1a25-4382-b39e-5b03e1ae8801.png',
        size: 33184,
        mimetype: 'image/png',
      },
      status: 'pending',
      createdBy: '65488ce0ff900ee743130657',
      isDeleted: false,
      createdAt: '2023-11-13T04:23:00.635Z',
      updatedAt: '2023-11-13T04:23:00.635Z',
    },
  })
  data: {};

  @ApiProperty({ example: null })
  errors: [];
}
