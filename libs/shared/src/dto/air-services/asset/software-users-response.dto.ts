import { ApiProperty } from '@nestjs/swagger';

export class SoftwareUsersResponse {
  @ApiProperty({ example: 201 })
  statusCode: number;
  @ApiProperty({
    example: ' Software Users Added Successfully',
  })
  message: string;
  @ApiProperty({
    example: {
      _id: '6537ec2a761c9916bafb3459',
      userRefId: '6537c5dfcb98fea498d10151',
      softwareId: '652569915c755e2b97708cb5',
      contractId: '6532730d3511a212449d1ef4',
      userId: '6537c5dfcb98fea498d10151',
      createdAt: '2023-10-24T16:09:14.808Z',
      updatedAt: '2023-10-24T16:09:14.808Z',
    },
  })
  data: {};
  @ApiProperty({ example: null })
  errors: [];
}
