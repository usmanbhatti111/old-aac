import { ApiProperty } from '@nestjs/swagger';

export class AttachmentAirResponse {
  @ApiProperty({ example: 201 })
  statusCode: number;
  @ApiProperty({
    example: 'Attachment Added',
  })
  message: string;
  @ApiProperty({
    example: {
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
  })
  data: {};
  @ApiProperty({ example: null })
  errors: [];
}
