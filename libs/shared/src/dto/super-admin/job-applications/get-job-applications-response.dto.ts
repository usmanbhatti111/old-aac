import { ApiProperty } from '@nestjs/swagger';

export class GetJobApplicationsResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({ example: 'Success' })
  message: string;

  @ApiProperty({
    example: {
      jobApplications: [
        {
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
          candidate: {
            _id: '65488ce0ff900ee743130657',
            name: 'Super Admin',
            profileImage: '',
          },
          jobPostedDate: '2023-11-02T04:48:39.655Z',
        },
        {
          _id: '654ddcc647ae5ba43a249621',
          jobId: '654322560c2e5ebdc64ed4fc',
          applyDate: '2023-11-10T07:30:18.612Z',
          resume: {
            id: 'a96af3a9-e996-4e53-83f9-9bf9974ed2c7',
            url: 'resumes/a96af3a9-e996-4e53-83f9-9bf9974ed2c7.png',
            size: 25125,
            mimetype: 'image/png',
          },
          coverLetter: {
            id: '15c7c3b7-5239-4edb-88e4-1285a69e20e5',
            url: 'coverLetters/15c7c3b7-5239-4edb-88e4-1285a69e20e5.png',
            size: 121121,
            mimetype: 'image/png',
          },
          status: 'pending',
          createdBy: '65488ce0ff900ee743130657',
          isDeleted: false,
          createdAt: '2023-11-10T07:33:26.515Z',
          updatedAt: '2023-11-10T07:33:26.515Z',
          candidate: {
            _id: '65488ce0ff900ee743130657',
            name: 'Super Admin',
            profileImage: '',
          },
          jobPostedDate: '2023-11-02T04:15:18.123Z',
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
