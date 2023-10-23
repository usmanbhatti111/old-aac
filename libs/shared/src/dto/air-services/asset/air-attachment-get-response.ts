import { ApiProperty } from '@nestjs/swagger';

export class AttachmentAirGetResponse {
  @ApiProperty({ example: 200 })
  statusCode: number;
  @ApiProperty({
    example: 'Get Attachment ',
  })
  message: string;
  @ApiProperty({
    example: [
      {
        _id: '653286c44124e4ea8b913e94',
        organizationAdminId: '651bdf53beeb02bc627d6804',
        companyAdminId: '651bdf53beeb02bc627d6804',
        type: 'pdf',
        fileUrl: 'users/attachment/05d4ff96-367b-4229-ae9e-ace9e59ef0f0.jpg',
        s3UploadObject: {
          id: '05d4ff96-367b-4229-ae9e-ace9e59ef0f0',
          url: 'users/attachment/05d4ff96-367b-4229-ae9e-ace9e59ef0f0.jpg',
        },
        airServiceFeatureType: 'inventory',
        recordId: '652fdda272567c24b1765629',
        createdAt: '2023-10-20T13:55:16.063Z',
        updatedAt: '2023-10-20T13:55:16.063Z',
      },
      {
        _id: '65329571b5172fc63443a2a2',
        organizationAdminId: '651bdf53beeb02bc627d6804',
        companyAdminId: '651bdf53beeb02bc627d6804',
        type: 'pdf',
        fileUrl: 'users/attachment/017de4c1-027f-4ae4-a9f6-c229a841f950.png',
        s3UploadObject: {
          id: '017de4c1-027f-4ae4-a9f6-c229a841f950',
          url: 'users/attachment/017de4c1-027f-4ae4-a9f6-c229a841f950.png',
        },
        airServiceFeatureType: 'pdf',
        recordId: '652fdda272567c24b1765629',
        createdAt: '2023-10-20T14:57:53.517Z',
        updatedAt: '2023-10-20T14:57:53.517Z',
      },
      {
        _id: '653295a0b5172fc63443a2a4',
        organizationAdminId: '651bdf53beeb02bc627d6804',
        companyAdminId: '651bdf53beeb02bc627d6804',
        type: 'pdf',
        fileUrl: 'users/attachment/fdb1f54f-70a3-4aa7-8793-4dd6bd865114.png',
        s3UploadObject: {
          id: 'fdb1f54f-70a3-4aa7-8793-4dd6bd865114',
          url: 'users/attachment/fdb1f54f-70a3-4aa7-8793-4dd6bd865114.png',
        },
        airServiceFeatureType: 'pdf',
        recordId: '652fdda272567c24b1765629',
        createdAt: '2023-10-20T14:58:40.741Z',
        updatedAt: '2023-10-20T14:58:40.741Z',
      },
    ],
  })
  data: [];
  @ApiProperty({ example: null })
  errors: [];
}
